import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const primaryEmail = 'nestor@zamili.dev';
const primaryEmailHref = `mailto:${primaryEmail}`;

const secondaryLinks = [
	{
		href: 'https://www.linkedin.com/in/nestor-zamili',
		label: 'LinkedIn',
		value: '/in/nestor-zamili',
		icon: Linkedin,
	},
	{
		href: 'https://github.com/nestorzamili',
		label: 'GitHub',
		value: '@nestorzamili',
		icon: Github,
	},
];

const footerLinks = [
	{
		href: primaryEmailHref,
		icon: Mail,
		label: 'Email',
		external: false,
	},
	{
		href: 'https://www.linkedin.com/in/nestor-zamili',
		icon: Linkedin,
		label: 'LinkedIn',
		external: true,
	},
	{
		href: 'https://github.com/nestorzamili',
		icon: Github,
		label: 'GitHub',
		external: true,
	},
];

export default function Contact() {
	return (
		<section
			id="contact"
			className="bg-slate-900 py-24 dark:bg-slate-900 light:bg-gray-50 md:py-20"
		>
			<div className="mx-auto max-w-6xl px-6">
				<motion.div
					className="mx-auto max-w-4xl rounded-[2rem] border border-slate-700/70 bg-linear-to-br from-slate-800 to-slate-900 px-8 py-10 text-center shadow-xl dark:border-slate-700/70 dark:from-slate-800 dark:to-slate-900 dark:shadow-xl light:border-gray-200 light:from-white light:to-gray-50 light:shadow-lg md:px-12 md:py-12"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-80px' }}
					transition={{ duration: 0.55 }}
				>
					<p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400 dark:text-cyan-400 light:text-cyan-600">
						Availability
					</p>
					<h2 className="mt-4 text-3xl font-bold text-white dark:text-white light:text-slate-900 sm:text-4xl md:text-5xl">
						<span className="text-cyan-400 dark:text-cyan-400 light:text-cyan-600">
							#
						</span>{' '}
						Contact
					</h2>
					<p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300 dark:text-gray-300 light:text-gray-600">
						Email is the best starting point if the work touches frontend
						delivery, platform engineering, or production reliability.
					</p>

					<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<Button
							asChild
							className="h-auto rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"
						>
							<a
								href={primaryEmailHref}
								className="inline-flex items-center gap-2"
							>
								<Mail size={16} />
								Email {primaryEmail}
							</a>
						</Button>

						{secondaryLinks.map((link) => {
							const Icon = link.icon;

							return (
								<a
									key={link.label}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-cyan-500 hover:text-cyan-400 dark:border-slate-700 dark:text-gray-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400 light:border-gray-300 light:text-gray-600 light:hover:border-cyan-500 light:hover:text-cyan-600"
								>
									<Icon size={16} />
									{link.label}
								</a>
							);
						})}
					</div>

					<p className="mt-6 text-sm leading-7 text-gray-400 dark:text-gray-400 light:text-gray-500">
						Best first message: product context, current bottleneck, and the
						outcome you are aiming for.
					</p>
				</motion.div>
			</div>

			<Separator className="mx-auto mt-20 max-w-6xl bg-slate-700 dark:bg-slate-700 light:bg-gray-200" />
			<motion.div
				className="mx-auto max-w-6xl px-6 pt-5"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
					<p className="text-base text-gray-400 dark:text-gray-400 light:text-gray-500">
						© {new Date().getFullYear()} Nestor Zamili. Open to thoughtful
						engineering conversations and production-focused collaboration.
					</p>
					<div className="flex items-center gap-5">
						{footerLinks.map((link) => {
							const Icon = link.icon;

							return (
								<motion.a
									key={link.label}
									href={link.href}
									target={link.external ? '_blank' : undefined}
									rel={link.external ? 'noopener noreferrer' : undefined}
									className="text-gray-400 transition-colors hover:text-cyan-400 dark:text-gray-400 dark:hover:text-cyan-400 light:text-gray-500 light:hover:text-cyan-600"
									aria-label={link.label}
									whileHover={{ scale: 1.2, y: -3 }}
									whileTap={{ scale: 0.9 }}
								>
									<Icon size={24} />
								</motion.a>
							);
						})}
					</div>
				</div>
			</motion.div>
		</section>
	);
}
