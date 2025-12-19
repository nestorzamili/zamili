/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <seo optimization> */
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';

import Header from '../components/Header';
import { ThemeProvider } from '../components/ThemeProvider';
import { personSchema, seo, websiteSchema } from '../lib/seo';

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
				title: seo.title,
			},
			{
				name: 'description',
				content: seo.description,
			},
			{
				property: 'og:title',
				content: seo.title,
			},
			{
				property: 'og:description',
				content: seo.description,
			},
			{
				property: 'og:type',
				content: 'website',
			},
			{
				property: 'og:url',
				content: seo.url,
			},
			{
				property: 'og:image',
				content: seo.image,
			},
		],
		links: [
			{
				rel: 'canonical',
				href: seo.url,
			},
			{
				rel: 'preload',
				as: 'image',
				href: '/profile.png',
			},
			{
				rel: 'icon',
				type: 'image/x-icon',
				href: '/favicon.ico',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png',
			},
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-touch-icon.png',
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
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
				/>
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
