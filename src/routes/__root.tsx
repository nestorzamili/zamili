import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';

import Header from '../components/Header';
import { ThemeProvider } from '../components/ThemeProvider';

import appCss from '../styles.css?url';

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'Nestor Zamili | Software Engineer — Platform & Delivery',
			},
			{
				name: 'description',
				content:
					'Technical portfolio of Nestor Zamili. Software Engineer focused on CI/CD, Kubernetes, Helm, and production operations.',
			},
		],
		links: [
			{
				rel: 'icon',
				type: 'image/png',
				href: '/icon.png',
			},
			{
				rel: 'apple-touch-icon',
				href: '/icon.png',
			},
			{
				rel: 'manifest',
				href: '/manifest.json',
			},
			{
				rel: 'stylesheet',
				href: appCss,
			},
			{
				rel: 'dns-prefetch',
				href: 'https://fonts.googleapis.com',
			},
			{
				rel: 'dns-prefetch',
				href: 'https://fonts.gstatic.com',
			},
			{
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com',
			},
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossOrigin: 'anonymous',
			},
			{
				rel: 'preload',
				as: 'style',
				href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark scroll-smooth">
			<head>
				<HeadContent />
			</head>
			<body className="antialiased">
				<ThemeProvider>
					<Header />
					{children}
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}
