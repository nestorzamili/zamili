'use client';

import { motion } from 'framer-motion';
import {
	Box,
	ChevronLeft,
	ChevronRight,
	Container,
	ExternalLink,
	GitBranch,
	Github,
	MessageSquare,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

const projects = [
	{
		title: 'Prakarsa',
		description:
			'A production-oriented side project focused on delivery and runtime behavior. Built to practice real deployment workflows and operational patterns.',
		highlights: [
			{
				icon: Box,
				label: 'Frontend',
				detail: 'Next.js with TypeScript',
			},
			{
				icon: MessageSquare,
				label: 'Backend',
				detail: 'Golang chat service with Redis',
			},
			{
				icon: GitBranch,
				label: 'CI/CD',
				detail: 'GitHub Actions automated builds',
			},
			{
				icon: Container,
				label: 'Infrastructure',
				detail: 'Kubernetes, production-like ops',
			},
		],
		tech: ['Next.js', 'Golang', 'Redis', 'Kubernetes', 'GitHub Actions'],
		github: '',
		live: 'https://prakarsa.id',
	},
	{
		title: 'Coming Soon',
		description:
			'More production-focused projects will be published here. Stay tuned for additional engineering work.',
		highlights: [],
		tech: [],
		github: '',
		live: '',
		isPlaceholder: true,
	},
];

export default function Projects() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const scrollToIndex = (index: number) => {
		if (scrollContainerRef.current) {
			const cardWidth = scrollContainerRef.current.offsetWidth;
			scrollContainerRef.current.scrollTo({
				left: index * cardWidth,
				behavior: 'smooth',
			});
			setActiveIndex(index);
		}
	};

	const handleScroll = () => {
		if (scrollContainerRef.current) {
			const scrollLeft = scrollContainerRef.current.scrollLeft;
			const cardWidth = scrollContainerRef.current.offsetWidth;
			const newIndex = Math.round(scrollLeft / cardWidth);
			setActiveIndex(newIndex);
		}
	};

	const scrollPrev = () => {
		if (activeIndex > 0) {
			scrollToIndex(activeIndex - 1);
		}
	};

	const scrollNext = () => {
		if (activeIndex < projects.length - 1) {
			scrollToIndex(activeIndex + 1);
		}
	};

	return (
		<section
			id="projects"
			className="py-24 md:py-20 bg-slate-950 dark:bg-slate-950 light:bg-white overflow-hidden"
		>
			<div className="max-w-6xl mx-auto px-6">
				<motion.div
					className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<div>
						<motion.h2
							className="text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-white light:text-slate-900 mb-4"
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
							className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-lg max-w-2xl"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							Projects focused on practical deployability and real-world
							production patterns.
						</motion.p>
					</div>

					{projects.filter((p) => !('isPlaceholder' in p)).length > 1 && (
						<div className="flex items-center gap-3">
							<Button
								variant="outline"
								size="icon"
								onClick={scrollPrev}
								disabled={activeIndex === 0}
								className="h-12 w-12 rounded-full border-slate-700 dark:border-slate-700 light:border-gray-300 text-gray-400 hover:text-white hover:border-cyan-500 hover:bg-cyan-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
							>
								<ChevronLeft size={24} />
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={scrollNext}
								disabled={activeIndex === projects.length - 1}
								className="h-12 w-12 rounded-full border-slate-700 dark:border-slate-700 light:border-gray-300 text-gray-400 hover:text-white hover:border-cyan-500 hover:bg-cyan-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
							>
								<ChevronRight size={24} />
							</Button>
						</div>
					)}
				</motion.div>
			</div>

			<div className="relative">
				<div
					ref={scrollContainerRef}
					onScroll={handleScroll}
					className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-4 pb-8 px-6 md:px-[calc((100vw-72rem)/2+1.5rem)]"
					style={{
						scrollbarWidth: 'none',
						msOverflowStyle: 'none',
					}}
				>
					{projects.map((project, index) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1, duration: 0.5 }}
							className="shrink-0 w-[calc(100vw-3rem)] sm:w-100 md:w-120 snap-center"
						>
							{'isPlaceholder' in project && project.isPlaceholder ? (
								<div className="h-full min-h-80 bg-slate-900/50 dark:bg-slate-900/50 light:bg-gray-100 rounded-2xl border-2 border-dashed border-slate-700 dark:border-slate-700 light:border-gray-300 flex flex-col items-center justify-center hover:border-cyan-600/50 transition-colors">
									<div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
										<Box size={32} className="text-gray-600" />
									</div>
									<h3 className="text-xl font-semibold text-gray-500 mb-2">
										{project.title}
									</h3>
									<p className="text-gray-500 text-center max-w-md px-6">
										{project.description}
									</p>
								</div>
							) : (
								<Card className="h-full bg-slate-800 dark:bg-slate-800 light:bg-white border-slate-700 dark:border-slate-700 light:border-gray-200 hover:border-cyan-500 dark:hover:border-cyan-500 light:hover:border-cyan-400 transition-all duration-300 group shadow-xl dark:shadow-xl light:shadow-lg overflow-hidden rounded-2xl hover:scale-[1.02]">
									<CardHeader className="pb-4 pt-6">
										<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
											<div className="flex items-center gap-4">
												<h3 className="text-2xl md:text-3xl font-bold text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
													{project.title}
												</h3>
												<span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 dark:text-cyan-400 light:text-cyan-600 rounded-full border border-cyan-500/20">
													Production
												</span>
											</div>
											<div className="flex items-center gap-2">
												{project.github && (
													<Button
														variant="ghost"
														size="icon"
														asChild
														className="h-10 w-10 text-gray-400 hover:text-white hover:bg-slate-800/50"
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
														variant="outline"
														asChild
														className="gap-2 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50"
													>
														<a
															href={project.live}
															target="_blank"
															rel="noopener noreferrer"
															aria-label="Live site"
														>
															<ExternalLink size={16} />
															Visit Site
														</a>
													</Button>
												)}
											</div>
										</div>
									</CardHeader>

									<CardContent className="space-y-6">
										<p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-base md:text-lg leading-relaxed">
											{project.description}
										</p>

										{project.highlights.length > 0 && (
											<div className="grid grid-cols-2 gap-3">
												{project.highlights.map((highlight) => (
													<div
														key={highlight.label}
														className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-800/50 dark:bg-slate-800/50 light:bg-white border border-slate-700/50 dark:border-slate-700/50 light:border-gray-200 hover:border-cyan-500/30 transition-colors"
													>
														<div className="shrink-0 w-7 h-7 rounded-md bg-linear-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
															<highlight.icon
																size={14}
																className="text-cyan-400 dark:text-cyan-400 light:text-cyan-600"
															/>
														</div>
														<div className="min-w-0">
															<h4 className="text-xs font-semibold text-gray-200 dark:text-gray-200 light:text-slate-800">
																{highlight.label}
															</h4>
															<p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-500 leading-tight">
																{highlight.detail}
															</p>
														</div>
													</div>
												))}
											</div>
										)}

										{project.tech.length > 0 && (
											<div className="pt-4 border-t border-slate-700/50 dark:border-slate-700/50 light:border-gray-200">
												<div className="flex flex-wrap gap-2">
													{project.tech.map((t) => (
														<Badge
															key={t}
															variant="secondary"
															className="bg-slate-700 dark:bg-slate-700 light:bg-gray-200 text-gray-300 dark:text-gray-300 light:text-gray-700 border-slate-600 dark:border-slate-600 light:border-gray-300 hover:bg-slate-600 dark:hover:bg-slate-600 light:hover:bg-gray-300"
														>
															{t}
														</Badge>
													))}
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							)}
						</motion.div>
					))}
				</div>

				{projects.filter((p) => !('isPlaceholder' in p)).length > 1 && (
					<div className="flex justify-center gap-2 mt-6">
						{projects.map((project, index) => (
							<button
								type="button"
								key={project.title}
								onClick={() => scrollToIndex(index)}
								className={`h-2 rounded-full transition-all duration-300 ${
									activeIndex === index
										? 'w-8 bg-cyan-500'
										: 'w-2 bg-slate-700 hover:bg-slate-600'
								}`}
								aria-label={`Go to project ${index + 1}`}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
