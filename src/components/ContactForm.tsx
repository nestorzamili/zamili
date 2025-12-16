'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { sendContactEmail } from '../utils/contact.server';
import { Button } from './ui/button';

interface FormState {
	name: string;
	email: string;
	message: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	message?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
	const [formData, setFormData] = useState<FormState>({
		name: '',
		email: '',
		message: '',
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [status, setStatus] = useState<SubmitStatus>('idle');
	const [errorMessage, setErrorMessage] = useState('');

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Name is required';
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email';
		}

		if (!formData.message.trim()) {
			newErrors.message = 'Message is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setStatus('loading');
		setErrorMessage('');

		try {
			await sendContactEmail({ data: formData });

			setStatus('success');
			setFormData({ name: '', email: '', message: '' });

			setTimeout(() => {
				setStatus('idle');
			}, 5000);
		} catch (err) {
			setStatus('error');
			setErrorMessage(
				err instanceof Error ? err.message : 'Something went wrong',
			);
		}
	};

	const inputBaseClass =
		'w-full px-4 py-3 rounded-lg border bg-slate-800 dark:bg-slate-800 light:bg-white text-white dark:text-white light:text-slate-900 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2';
	const inputNormalClass =
		'border-slate-600 dark:border-slate-600 light:border-gray-300 focus:border-cyan-500 focus:ring-cyan-500/20';
	const inputErrorClass =
		'border-red-500 focus:border-red-500 focus:ring-red-500/20';

	if (status === 'success') {
		return (
			<motion.div
				className="flex flex-col items-center justify-center text-center p-8 h-full min-h-75"
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}
			>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
				>
					<CheckCircle
						size={64}
						className="text-green-500 dark:text-green-400 mb-4"
					/>
				</motion.div>
				<h3 className="text-xl font-semibold text-white dark:text-white light:text-slate-900 mb-2">
					Message Sent!
				</h3>
				<p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
					Thanks for reaching out. I'll get back to you soon.
				</p>
			</motion.div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div>
				<label
					htmlFor="contact-name"
					className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-600 mb-2"
				>
					Name
				</label>
				<input
					type="text"
					id="contact-name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Your name"
					className={`${inputBaseClass} ${errors.name ? inputErrorClass : inputNormalClass}`}
					disabled={status === 'loading'}
				/>
				{errors.name && (
					<p className="mt-1 text-sm text-red-500">{errors.name}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="contact-email"
					className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-600 mb-2"
				>
					Email
				</label>
				<input
					type="email"
					id="contact-email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="your@email.com"
					className={`${inputBaseClass} ${errors.email ? inputErrorClass : inputNormalClass}`}
					disabled={status === 'loading'}
				/>
				{errors.email && (
					<p className="mt-1 text-sm text-red-500">{errors.email}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="contact-message"
					className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-600 mb-2"
				>
					Message
				</label>
				<textarea
					id="contact-message"
					name="message"
					value={formData.message}
					onChange={handleChange}
					placeholder="Your message..."
					rows={4}
					className={`${inputBaseClass} resize-none ${errors.message ? inputErrorClass : inputNormalClass}`}
					disabled={status === 'loading'}
				/>
				{errors.message && (
					<p className="mt-1 text-sm text-red-500">{errors.message}</p>
				)}
			</div>

			{status === 'error' && (
				<motion.div
					className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<AlertCircle size={18} />
					<span className="text-sm">{errorMessage}</span>
				</motion.div>
			)}

			<Button
				type="submit"
				disabled={status === 'loading'}
				className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-medium py-3 h-auto disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-cyan-500/20"
			>
				{status === 'loading' ? (
					<span className="flex items-center gap-2">
						<Loader2 size={18} className="animate-spin" />
						Sending...
					</span>
				) : (
					<span className="flex items-center gap-2">
						<Send size={18} />
						Send Message
					</span>
				)}
			</Button>
		</form>
	);
}
