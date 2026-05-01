import About from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import { ThemeProvider } from './components/ThemeProvider';

export default function App() {
	return (
		<ThemeProvider>
			<Header />
			<main className="pt-16">
				<Hero />
				<About />
				<TechStack />
				<Experience />
				<Projects />
				<Contact />
			</main>
		</ThemeProvider>
	);
}
