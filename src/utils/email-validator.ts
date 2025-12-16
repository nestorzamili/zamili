import domains from 'disposable-email-domains';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const disposableDomains = new Set<string>(domains as string[]);

export function isValidEmailFormat(email: string): boolean {
	if (!email || typeof email !== 'string') {
		return false;
	}
	return EMAIL_REGEX.test(email.trim().toLowerCase());
}

export function isDisposableEmail(email: string): boolean {
	if (!email || typeof email !== 'string') {
		return false;
	}

	const domain = email.trim().toLowerCase().split('@')[1];
	if (!domain) {
		return false;
	}

	return disposableDomains.has(domain);
}

export function validateEmail(email: string): {
	valid: boolean;
	error?: string;
} {
	if (!isValidEmailFormat(email)) {
		return { valid: false, error: 'Invalid email format' };
	}

	if (isDisposableEmail(email)) {
		return {
			valid: false,
			error: 'Disposable email addresses are not allowed',
		};
	}

	return { valid: true };
}
