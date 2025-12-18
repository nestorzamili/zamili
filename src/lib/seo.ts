export const personSchema = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	'@id': 'https://zamili.dev/#person',
	name: 'Nestor Zamili',
	jobTitle: 'Software Engineer — Platform & Delivery',
	url: 'https://zamili.dev',
	image: 'https://zamili.dev/profile.png',
	sameAs: [
		'https://github.com/nestorzamili',
		'https://linkedin.com/in/nestor-zamili',
	],
} as const;

export const websiteSchema = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': 'https://zamili.dev/#website',
	name: 'Nestor Zamili Portfolio',
	url: 'https://zamili.dev',
	author: {
		'@id': 'https://zamili.dev/#person',
	},
} as const;

export const seo = {
	title: 'Nestor Zamili | Software Engineer — Platform & Delivery',
	description:
		'Software Engineer specializing in CI/CD pipelines, Kubernetes operations, Helm-based deployments, and production troubleshooting.',
	url: 'https://zamili.dev',
	image: 'https://zamili.dev/profile.png',
} as const;
