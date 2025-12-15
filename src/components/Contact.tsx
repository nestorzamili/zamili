'use client';

import { motion } from 'framer-motion';
import { FileDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';

const contactLinks = [
	{
		href: 'mailto:nestorzamili@gmail.com',
		icon: Mail,
		label: 'Email',
		value: 'nestorzamili@gmail.com',
		external: false,
	},
	{
		href: 'https://www.linkedin.com/in/nestor-zamili',
		icon: Linkedin,
		label: 'LinkedIn',
		value: '/in/nestor-zamili',
		external: true,
	},
	{
		href: 'https://github.com/nestorzamili',
		icon: Github,
		label: 'GitHub',
		value: '@nestorzamili',
		external: true,
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

export default function Contact() {
	return (
		<section
			id="contact"
			className="py-24 md:py-32 bg-slate-900 dark:bg-slate-900 light:bg-gray-50"
		>
			<div className="max-w-6xl mx-auto px-6">
				<motion.h2
					className="text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-white light:text-slate-900 mb-6"
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
				>
					<span className="text-cyan-400 dark:text-cyan-400 light:text-cyan-600">
						#
					</span>{' '}
					Get In Touch
				</motion.h2>
				<motion.p
					className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-lg mb-16 max-w-3xl"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					I'm open to discussing deployment challenges, platform engineering
					opportunities, or interesting technical problems. Feel free to reach
					out.
				</motion.p>

				<div className="grid md:grid-cols-2 gap-12">
					{/* Contact Methods */}
					<motion.div
						className="space-y-5"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-50px' }}
					>
						{contactLinks.map((link) => {
							const Icon = link.icon;
							return (
								<motion.div key={link.label} variants={itemVariants}>
									<motion.a
										href={link.href}
										target={link.external ? '_blank' : undefined}
										rel={link.external ? 'noopener noreferrer' : undefined}
										whileHover={{ x: 8 }}
										transition={{ duration: 0.2 }}
									>
										<Card className="bg-slate-800 dark:bg-slate-800 light:bg-white border-slate-700 dark:border-slate-700 light:border-gray-200 hover:border-cyan-500 dark:hover:border-cyan-500 light:hover:border-cyan-400 transition-all duration-300 group cursor-pointer shadow-lg dark:shadow-lg light:shadow-md">
											<CardContent className="flex items-center gap-5 p-5">
												<motion.div
													className="p-4 bg-slate-700 dark:bg-slate-700 light:bg-gray-100 rounded-xl group-hover:bg-cyan-600 dark:group-hover:bg-cyan-600 light:group-hover:bg-cyan-500 transition-colors"
													whileHover={{ rotate: 5 }}
												>
													<Icon
														size={28}
														className="text-gray-300 dark:text-gray-300 light:text-gray-600 group-hover:text-white transition-colors"
													/>
												</motion.div>
												<div>
													<p className="text-white dark:text-white light:text-slate-900 font-semibold text-lg">
														{link.label}
													</p>
													<p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-base">
														{link.value}
													</p>
												</div>
											</CardContent>
										</Card>
									</motion.a>
								</motion.div>
							);
						})}
					</motion.div>

					{/* Download CV */}
					<motion.div
						className="flex flex-col justify-center"
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						<Card className="bg-linear-to-br from-cyan-900/50 to-slate-800 dark:from-cyan-900/50 dark:to-slate-800 light:from-cyan-50 light:to-white border-cyan-600/50 dark:border-cyan-600/50 light:border-cyan-200 shadow-xl dark:shadow-xl light:shadow-lg">
							<CardContent className="p-8 md:p-10">
								<h3 className="text-2xl font-bold text-white dark:text-white light:text-slate-900 mb-4">
									Want the full picture?
								</h3>
								<p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-lg mb-8">
									Download my resume for a complete overview of my experience,
									skills, and background.
								</p>
								<Button
									asChild
									size="lg"
									className="bg-cyan-600 hover:bg-cyan-500 text-white text-lg px-8 py-6 h-auto"
								>
									<a
										href="/CV_Nestorius_Fanelama_Zamili.pdf"
										download
										className="flex items-center gap-3"
									>
										<FileDown size={24} />
										Download Resume
									</a>
								</Button>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>

			{/* Footer */}
			<Separator className="max-w-6xl mx-auto mt-24 bg-slate-700 dark:bg-slate-700 light:bg-gray-200" />
			<motion.div
				className="max-w-6xl mx-auto px-6 pt-10"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5 }}
			>
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					<p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-base">
						© {new Date().getFullYear()} Nestor Zamili. Built with TanStack
						Start.
					</p>
					<div className="flex items-center gap-5">
						{contactLinks.map((link) => {
							const Icon = link.icon;
							return (
								<motion.a
									key={link.label}
									href={link.href}
									target={link.external ? '_blank' : undefined}
									rel={link.external ? 'noopener noreferrer' : undefined}
									className="text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-cyan-400 dark:hover:text-cyan-400 light:hover:text-cyan-600 transition-colors"
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
