import { createFileRoute } from '@tanstack/react-router';
import About from '../components/About';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import TechStack from '../components/TechStack';

export const Route = createFileRoute('/')({ component: App });

function App() {
	return (
		<div className="pt-16">
			<Hero />
			<About />
			<TechStack />
			<Experience />
			<Projects />
			<Contact />
		</div>
	);
}
