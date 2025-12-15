'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

const projects = [
	{
		title: 'Portfolio Website',
		description:
			'This site. Built with TanStack Start and Tailwind CSS. Focused on clean design and good performance.',
		tech: ['TanStack Start', 'React', 'TypeScript', 'Tailwind CSS'],
		github: 'https://github.com/nestorzamili',
		live: 'https://zamili.dev',
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.5,
		},
	},
};

export default function Projects() {
	return (
		<section
			id="projects"
			className="py-24 md:py-32 bg-slate-950 dark:bg-slate-950 light:bg-white"
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
					Projects
				</motion.h2>
				<motion.p
					className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-lg mb-16 max-w-3xl"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					A selection of projects I've built. These focus on practical
					deployability and real-world production patterns rather than flashy
					demos.
				</motion.p>

				<motion.div
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-50px' }}
				>
					{projects.map((project) => (
						<motion.div
							key={project.title}
							variants={cardVariants}
							whileHover={{ y: -8 }}
						>
							<Card className="h-full bg-slate-900 dark:bg-slate-900 light:bg-gray-50 border-slate-800 dark:border-slate-800 light:border-gray-200 hover:border-cyan-500 dark:hover:border-cyan-500 light:hover:border-cyan-400 transition-all duration-300 group shadow-xl dark:shadow-xl light:shadow-lg">
								<CardHeader className="pb-4">
									<div className="flex items-start justify-between">
										<h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 dark:group-hover:text-cyan-400 light:group-hover:text-cyan-600 transition-colors">
											{project.title}
										</h3>
										<div className="flex items-center gap-2">
											{project.github && (
												<Button
													variant="ghost"
													size="icon"
													asChild
													className="h-10 w-10 text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-white dark:hover:text-white light:hover:text-cyan-600 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-200"
												>
													<a
														href={project.github}
														target="_blank"
														rel="noopener noreferrer"
														aria-label="GitHub repository"
													>
														<Github size={22} />
													</a>
												</Button>
											)}
											{project.live && (
												<Button
													variant="ghost"
													size="icon"
													asChild
													className="h-10 w-10 text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-white dark:hover:text-white light:hover:text-cyan-600 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-200"
												>
													<a
														href={project.live}
														target="_blank"
														rel="noopener noreferrer"
														aria-label="Live site"
													>
														<ExternalLink size={22} />
													</a>
												</Button>
											)}
										</div>
									</div>
								</CardHeader>

								<CardContent>
									<p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-base mb-6 leading-relaxed">
										{project.description}
									</p>

									<div className="flex flex-wrap gap-2">
										{project.tech.map((t) => (
											<span
												key={t}
												className="px-3 py-1.5 text-sm font-medium bg-slate-800 dark:bg-slate-800 light:bg-gray-200 text-gray-300 dark:text-gray-300 light:text-gray-700 rounded-lg"
											>
												{t}
											</span>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}

					{/* Placeholder for more projects */}
					<motion.div
						variants={cardVariants}
						className="bg-slate-900/50 dark:bg-slate-900/50 light:bg-gray-100 rounded-xl border-2 border-dashed border-slate-700 dark:border-slate-700 light:border-gray-300 flex items-center justify-center min-h-64 hover:border-cyan-600/50 dark:hover:border-cyan-600/50 light:hover:border-cyan-400 transition-colors"
					>
						<p className="text-gray-500 dark:text-gray-500 light:text-gray-400 text-lg text-center px-6">
							More projects coming soon...
						</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
