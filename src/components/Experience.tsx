'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';

const experiences = [
	{
		title: 'DevOps / Deployment Team',
		period: 'Current',
		type: 'Professional',
		description:
			'Responsible for delivering and operating enterprise applications in production environments.',
		responsibilities: [
			'Design and maintain CI/CD pipelines using Jenkins and Bitbucket',
			'Deploy and manage applications on Kubernetes clusters using Helm',
			'Operate on-premise Kubernetes infrastructure',
			'Troubleshoot production issues and implement fixes',
		],
	},
	{
		title: 'Production Operations',
		period: 'Previous',
		type: 'Professional',
		description: 'First-line support for production systems and services.',
		responsibilities: [
			'Troubleshoot services running in Kubernetes and Docker',
			'Database patching and hot fixes',
			'Service-level debugging and incident response',
			'Build automation and RPA scripts for operational tasks',
		],
	},
	{
		title: 'Personal Projects',
		period: 'Ongoing',
		type: 'Side Projects',
		description:
			'Fullstack applications built with a production-first mindset.',
		responsibilities: [
			'Build applications with React, TypeScript, and modern frameworks',
			'Focus on deployability and containerization',
			'Learn from runtime behavior and production failures',
			'Experiment with different deployment strategies',
		],
	},
];

const cardVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
		},
	},
};

export default function Experience() {
	return (
		<section
			id="experience"
			className="py-24 md:py-20 bg-slate-900 dark:bg-slate-900 light:bg-gray-50"
		>
			<div className="max-w-6xl mx-auto px-6">
				<motion.h2
					className="text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-white light:text-slate-900 mb-10"
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
				>
					<span className="text-cyan-400 dark:text-cyan-400 light:text-cyan-600">
						#
					</span>{' '}
					Experience
				</motion.h2>

				<div className="relative min-h-250">
					<motion.div
						className="absolute left-0 md:left-1/2 top-0 h-full w-1 bg-cyan-600/30 dark:bg-cyan-600/30 light:bg-cyan-300/50 transform md:-translate-x-1/2 rounded-full"
						initial={{ scaleY: 0 }}
						whileInView={{ scaleY: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						style={{ originY: 0 }}
					/>

					<div className="relative">
						{experiences.map((exp, index) => {
							const leftPositions: number[] = [];
							const rightPositions: number[] = [];

							for (let i = 0; i <= index; i++) {
								const isCardLeft = i % 2 === 0;
								let cardTop = 0;

								if (isCardLeft) {
									if (leftPositions.length === 0) {
										cardTop = 0;
									} else {
										cardTop = leftPositions[leftPositions.length - 1] + 600;
									}
									leftPositions.push(cardTop);
								} else {
									if (rightPositions.length === 0) {
										cardTop = 250;
									} else {
										cardTop = rightPositions[rightPositions.length - 1] + 600;
									}
									rightPositions.push(cardTop);
								}
							}

							const isLeft = index % 2 === 0;
							const topOffset = isLeft
								? leftPositions[leftPositions.length - 1]
								: rightPositions[rightPositions.length - 1];

							return (
								<motion.div
									key={exp.title}
									variants={cardVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, margin: '-100px' }}
									className={`relative mb-6 last:mb-0 md:mb-0 md:absolute pl-10 md:pl-0 w-full md:w-[calc(50%-4rem)] ${isLeft ? 'md:left-0 md:right-auto' : 'md:left-auto md:right-0'}`}
									style={{
										top: undefined,
									}}
									data-desktop-top={topOffset}
								>
									<motion.div
										className={`hidden md:block absolute top-8 ${
											isLeft
												? 'left-[calc(100%+1rem)]'
												: 'right-[calc(100%+1rem)]'
										} w-12 h-0.5 bg-linear-to-r ${
											isLeft
												? 'from-transparent to-cyan-500/50'
												: 'from-cyan-500/50 to-transparent'
										} z-10`}
										initial={{ scaleX: 0 }}
										whileInView={{ scaleX: 1 }}
										viewport={{ once: true }}
										transition={{ delay: 0.4, duration: 0.4 }}
										style={{
											originX: isLeft ? 1 : 0,
										}}
									/>
									<style>{`
									@media (min-width: 768px) {
										[data-desktop-top="${topOffset}"][data-desktop-top] {
											top: ${topOffset}px !important;
										}
									}
								`}</style>

									<motion.div
										className={`absolute top-8 ${
											isLeft
												? 'left-[calc(100%+4rem)] -translate-x-1/2'
												: 'right-[calc(100%+4rem)] translate-x-1/2'
										} hidden md:block w-5 h-5 bg-cyan-500 rounded-full transform -translate-y-1/2 border-4 border-slate-900 dark:border-slate-900 light:border-gray-50 z-20 shadow-lg shadow-cyan-500/50`}
										initial={{ scale: 0 }}
										whileInView={{ scale: 1 }}
										viewport={{ once: true }}
										transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
									>
										<motion.div
											className="absolute inset-0 rounded-full bg-cyan-500/30"
											animate={{
												scale: [1, 1.8, 1],
												opacity: [0.5, 0, 0.5],
											}}
											transition={{
												duration: 2,
												repeat: Number.POSITIVE_INFINITY,
												ease: 'easeInOut',
											}}
										/>
									</motion.div>

									<div className="md:hidden absolute left-0 top-8 w-5 h-5 bg-cyan-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-slate-900 z-20 shadow-lg shadow-cyan-500/50" />
									<div className="md:hidden absolute left-2.5 top-8 w-8 h-0.5 bg-cyan-500/50" />

									<div className="md:ml-0">
										<Card className="bg-slate-800 dark:bg-slate-800 light:bg-white border-slate-700 dark:border-slate-700 light:border-gray-200 hover:border-cyan-500 dark:hover:border-cyan-500 light:hover:border-cyan-400 transition-all duration-300 shadow-xl dark:shadow-xl light:shadow-lg hover:scale-[1.02]">
											<CardHeader className="pb-4">
												<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
													<div>
														<h3 className="text-xl md:text-2xl font-bold text-white dark:text-white light:text-slate-900">
															{exp.title}
														</h3>
														<span className="inline-block px-4 py-1.5 mt-3 text-sm font-medium bg-cyan-600 text-white rounded-full">
															{exp.type}
														</span>
													</div>
													<div className="flex items-center gap-2 text-gray-400 dark:text-gray-400 light:text-gray-500 text-base">
														<Calendar size={18} />
														<span className="font-medium">{exp.period}</span>
													</div>
												</div>
											</CardHeader>

											<CardContent>
												<p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-base mb-5">
													{exp.description}
												</p>

												<ul className="space-y-3">
													{exp.responsibilities.map((resp) => (
														<motion.li
															key={resp}
															className="flex items-start gap-3 text-gray-300 dark:text-gray-300 light:text-gray-600 text-base"
															initial={{ opacity: 0, x: -10 }}
															whileInView={{ opacity: 1, x: 0 }}
															viewport={{ once: true }}
															transition={{ duration: 0.3 }}
														>
															<span className="text-cyan-400 dark:text-cyan-400 light:text-cyan-600 text-lg mt-0.5">
																▸
															</span>
															{resp}
														</motion.li>
													))}
												</ul>
											</CardContent>
										</Card>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
