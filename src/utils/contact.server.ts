import { createServerFn } from '@tanstack/react-start';
import { Resend } from 'resend';
import { validateEmail } from './email-validator';
import { checkRateLimit } from './rate-limiter';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactInput {
	name: string;
	email: string;
	message: string;
}

function escapeHtml(text: string): string {
	const htmlEntities: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
	};
	return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

export const sendContactEmail = createServerFn({ method: 'POST' })
	.inputValidator((data: ContactInput): ContactInput => {
		if (
			!data.name ||
			typeof data.name !== 'string' ||
			data.name.trim() === ''
		) {
			throw new Error('Name is required');
		}
		if (!data.email || typeof data.email !== 'string') {
			throw new Error('Email is required');
		}
		if (
			!data.message ||
			typeof data.message !== 'string' ||
			data.message.trim() === ''
		) {
			throw new Error('Message is required');
		}

		const emailValidation = validateEmail(data.email);
		if (!emailValidation.valid) {
			throw new Error(emailValidation.error || 'Invalid email');
		}

		return {
			name: data.name.trim().slice(0, 100),
			email: data.email.trim().toLowerCase(),
			message: data.message.trim().slice(0, 5000),
		};
	})
	.handler(async ({ data }: { data: ContactInput }) => {
		const rateLimitResult = checkRateLimit(data.email);
		if (!rateLimitResult.allowed) {
			const minutes = Math.ceil(
				(rateLimitResult.retryAfterMs || 0) / 1000 / 60,
			);
			throw new Error(
				`Rate limit exceeded. Please try again in ${minutes} minutes.`,
			);
		}

		if (!process.env.RESEND_API_KEY || !process.env.EMAIL_RECIPIENT) {
			console.error('Email environment variables not configured');
			throw new Error('Email service is not configured');
		}

		const { name, email, message } = data;

		const { data: emailData, error } = await resend.emails.send({
			from: 'zamili.dev <noreply@zamili.dev>',
			to: process.env.EMAIL_RECIPIENT,
			replyTo: email,
			subject: `[zamili.dev] Contact from ${name}`,
			html: `
				<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<h2 style="color: #0891b2; margin-bottom: 20px;">New Contact Form Submission</h2>
					<div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
						<p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
						<p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
					</div>
					<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
						<p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
						<p style="margin: 0; white-space: pre-wrap; color: #334155;">${escapeHtml(message)}</p>
					</div>
					<p style="margin-top: 20px; color: #64748b; font-size: 12px;">
						This message was sent from the contact form on zamili.dev
					</p>
				</div>
			`,
		});

		if (error) {
			console.error('Resend API error:', error);
			throw new Error('Failed to send message. Please try again later.');
		}

		return {
			success: true,
			message: 'Message sent successfully',
			id: emailData?.id,
		};
	});
