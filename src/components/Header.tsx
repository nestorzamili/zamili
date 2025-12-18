import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { FileDown, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';

const navLinks = [
	{ href: '#about', label: 'About' },
	{ href: '#experience', label: 'Experience' },
	{ href: '#projects', label: 'Projects' },
	{ href: '#contact', label: 'Contact' },
];

const socialLinks = [
	{ href: 'https://github.com/nestorzamili', icon: Github, label: 'GitHub' },
	{
		href: 'https://www.linkedin.com/in/nestor-zamili',
		icon: Linkedin,
		label: 'LinkedIn',
	},
	{ href: 'mailto:nestorzamili@gmail.com', icon: Mail, label: 'Email' },
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [visible, setVisible] = useState(true);
	const [isHeroSection, setIsHeroSection] = useState(true);
	const [progress, setProgress] = useState(0);
	const [activeHash, setActiveHash] = useState<string | null>(null);
	const lastScrollY = useRef(0);
	const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const heroHeight = window.innerHeight;
			const isInHero = currentScrollY < heroHeight - 100;

			setIsHeroSection(isInHero);

			if (isInHero) {
				setVisible(true);
				lastScrollY.current = currentScrollY;
				return;
			}

			setVisible(true);

			if (scrollTimeout.current) {
				clearTimeout(scrollTimeout.current);
			}
			scrollTimeout.current = setTimeout(() => {
				if (!isInHero) {
					setVisible(false);
				}
			}, 1500);

			lastScrollY.current = currentScrollY;

			const doc = document.documentElement;
			const scrollTop = doc.scrollTop || document.body.scrollTop;
			const scrollHeight = doc.scrollHeight - doc.clientHeight;
			const pct =
				scrollHeight > 0
					? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
					: 0;
			setProgress(pct);

			const sections = navLinks.map((l) => l.href);
			let current: string | null = null;
			for (const href of sections) {
				const el = document.querySelector(href) as HTMLElement | null;
				if (!el) continue;
				const rect = el.getBoundingClientRect();
				if (rect.top <= 120 && rect.bottom > 120) {
					current = href;
					break;
				}
			}
			setActiveHash(current);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (scrollTimeout.current) {
				clearTimeout(scrollTimeout.current);
			}
		};
	}, []);

	const handleNavClick = (href: string) => {
		setIsOpen(false);
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleMouseEnter = () => {
		if (!isHeroSection) {
			setVisible(true);
		}
	};

	return (
		<>
			{!isHeroSection && (
				<div className="fixed top-0 left-0 right-0 z-60" aria-hidden="true">
					<div
						className="h-0.5 bg-cyan-500"
						style={{ width: `${progress}%` }}
					/>
				</div>
			)}
			{!isHeroSection && !visible && (
				<button
					type="button"
					className="fixed top-0 left-0 right-0 h-4 z-50 cursor-default"
					onMouseEnter={handleMouseEnter}
					aria-hidden="true"
					tabIndex={-1}
				/>
			)}

			<motion.header
				className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
					isHeroSection
						? 'bg-slate-950 dark:bg-slate-950 light:bg-white shadow-none'
						: 'bg-slate-900/95 dark:bg-slate-900/95 light:bg-white/95 backdrop-blur-md shadow-lg'
				}`}
				initial={{ y: 0, opacity: 0 }}
				animate={{ y: isHeroSection ? 0 : visible ? 0 : -100, opacity: 1 }}
				transition={{ duration: 0.3 }}
				onMouseEnter={handleMouseEnter}
			>
				<nav className="max-w-6xl mx-auto px-6 py-5">
					<div className="flex items-center justify-between">
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link
								to="/"
								className="text-2xl font-bold flex items-center gap-1 text-white dark:text-white light:text-slate-900 hover:text-cyan-400 transition-colors"
							>
								<span>Nestor</span>
								<span className="text-cyan-400 dark:text-cyan-400 light:text-cyan-600">
									Zamili
								</span>
							</Link>
						</motion.div>

						<div className="hidden md:flex items-center gap-8">
							{navLinks.map((link, index) => (
								<motion.button
									key={link.href}
									type="button"
									onClick={() => handleNavClick(link.href)}
									className={`relative text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-cyan-600 transition-colors font-medium text-base ${activeHash === link.href ? 'text-cyan-400 dark:text-cyan-400 light:text-cyan-600' : ''}`}
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									whileHover={{ y: -2 }}
								>
									{link.label}
									<span
										className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 dark:bg-cyan-400 light:bg-cyan-600 transition-all ${activeHash === link.href ? 'w-full' : 'w-0'} `}
										aria-hidden="true"
									/>
								</motion.button>
							))}

							<ThemeToggle />

							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
							>
								<Button
									asChild
									className="bg-cyan-700 hover:bg-cyan-600 text-white font-medium text-base px-5 py-2.5 h-auto"
								>
									<a
										href="/CV_Nestorius_Fanelama_Zamili.pdf"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2"
									>
										<FileDown size={20} />
										Resume
									</a>
								</Button>
							</motion.div>
						</div>

						<div className="flex items-center gap-3 md:hidden">
							<ThemeToggle />
							<motion.button
								type="button"
								onClick={() => setIsOpen(!isOpen)}
								className="p-2 text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
								aria-label="Toggle menu"
								whileTap={{ scale: 0.9 }}
							>
								{isOpen ? <X size={28} /> : <Menu size={28} />}
							</motion.button>
						</div>
					</div>

					<AnimatePresence>
						{isOpen && (
							<motion.div
								className="md:hidden mt-5 pb-5 border-t border-slate-700 dark:border-slate-700 light:border-gray-200 pt-5"
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3 }}
							>
								<div className="flex flex-col gap-5">
									{navLinks.map((link, index) => (
										<motion.button
											key={link.href}
											type="button"
											onClick={() => handleNavClick(link.href)}
											className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-cyan-600 transition-colors font-medium text-lg text-left"
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1 }}
										>
											{link.label}
										</motion.button>
									))}
									<Button
										asChild
										className="bg-cyan-700 hover:bg-cyan-600 text-white font-medium text-base w-fit px-5 py-2.5 h-auto"
									>
										<a
											href="/CV_Nestorius_Fanelama_Zamili.pdf"
											download
											className="flex items-center gap-2"
										>
											<FileDown size={20} />
											Resume
										</a>
									</Button>
									<div className="flex items-center gap-5 pt-3">
										{socialLinks.map((link) => {
											const Icon = link.icon;
											return (
												<motion.a
													key={link.label}
													href={link.href}
													target={
														link.href.startsWith('mailto')
															? undefined
															: '_blank'
													}
													rel={
														link.href.startsWith('mailto')
															? undefined
															: 'noopener noreferrer'
													}
													className="text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-cyan-600 transition-colors"
													aria-label={link.label}
													whileHover={{ scale: 1.2 }}
													whileTap={{ scale: 0.9 }}
												>
													<Icon size={24} />
												</motion.a>
											);
										})}
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</nav>
			</motion.header>
		</>
	);
}
