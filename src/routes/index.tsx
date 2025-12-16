import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';

// Lazy load below-fold components for better FCP/LCP
const About = lazy(() => import('../components/About'));
const TechStack = lazy(() => import('../components/TechStack'));
const Experience = lazy(() => import('../components/Experience'));
const Projects = lazy(() => import('../components/Projects'));
const Contact = lazy(() => import('../components/Contact'));

export const Route = createFileRoute('/')({ component: App });

function App() {
	return (
		<main className="pt-16">
			<Hero />
			<Suspense fallback={<div className="min-h-[50vh]" />}>
				<About />
				<TechStack />
				<Experience />
				<Projects />
				<Contact />
			</Suspense>
		</main>
	);
}
