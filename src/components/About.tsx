'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
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

const focusAreas = [
	{
		title: 'Deployment Pipelines',
		description:
			'Designing CI/CD workflows that are reproducible, observable, and fail gracefully. Jenkins, GitOps, Helm charts.',
	},
	{
		title: 'Kubernetes Operations',
		description:
			'Running and debugging workloads on K8s clusters—understanding pod lifecycles, resource limits, and cluster networking.',
	},
	{
		title: 'Production Troubleshooting',
		description:
			'Diagnosing issues in live environments. Reading logs, tracing requests, understanding failure modes.',
	},
	{
		title: 'Fullstack Development',
		description:
			'Building applications with React/TypeScript, always thinking about how they run in production.',
	},
];

export default function About() {
	return (
		<section
			id="about"
			className="py-24 md:py-32 bg-slate-900 dark:bg-slate-900 light:bg-gray-50"
		>
			<div className="max-w-6xl mx-auto px-6">
				<motion.h2
					className="text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-white light:text-slate-900 mb-16"
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
				>
					<span className="text-cyan-400 dark:text-cyan-400 light:text-cyan-600">
						#
					</span>{' '}
					About Me
				</motion.h2>

				<div className="grid lg:grid-cols-2 gap-16">
					{/* Career Background */}
					<motion.div
						className="space-y-8"
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<h3 className="text-2xl font-semibold text-white dark:text-white light:text-slate-900">
							Career Background
						</h3>

						<div className="space-y-6 text-gray-300 dark:text-gray-300 light:text-gray-600 text-lg leading-relaxed">
							<p>
								I started in{' '}
								<span className="text-white dark:text-white light:text-slate-900 font-medium">
									production operations
								</span>
								—troubleshooting services in Kubernetes and Docker environments,
								patching databases, debugging service-level issues, and building
								small automation scripts.
							</p>

							<p>
								Currently, I work in a{' '}
								<span className="text-white dark:text-white light:text-slate-900 font-medium">
									DevOps / deployment-focused team
								</span>{' '}
								where I:
							</p>

							<ul className="space-y-3 ml-4">
								{[
									'Build and maintain CI/CD pipelines using Jenkins and Bitbucket',
									'Deploy applications to Kubernetes clusters using Helm',
									'Operate and troubleshoot on-prem Kubernetes infrastructure',
									'Manage GCE VM-based deployments',
								].map((item, index) => (
									<motion.li
										key={item}
										className="flex items-start gap-3"
										initial={{ opacity: 0, x: -10 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 }}
									>
										<span className="text-cyan-400 dark:text-cyan-400 light:text-cyan-600 text-xl mt-0.5">
											•
										</span>
										<span>{item}</span>
									</motion.li>
								))}
							</ul>

							<p>
								On the side, I build fullstack applications with a focus on
								<span className="text-white dark:text-white light:text-slate-900 font-medium">
									{' '}
									deployability
								</span>
								, runtime behavior, and learning from production failures.
							</p>
						</div>
					</motion.div>

					{/* What I Do */}
					<div className="space-y-8">
						<motion.h3
							className="text-2xl font-semibold text-white dark:text-white light:text-slate-900"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							What I Focus On
						</motion.h3>

						<motion.div
							className="grid gap-5"
							variants={containerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-50px' }}
						>
							{focusAreas.map((area, index) => (
								<motion.div
									key={area.title}
									variants={itemVariants}
									custom={index}
								>
									<Card className="bg-slate-800 dark:bg-slate-800 light:bg-white border-slate-700 dark:border-slate-700 light:border-gray-200 hover:border-cyan-500 dark:hover:border-cyan-500 light:hover:border-cyan-400 transition-all duration-300 group shadow-none light:shadow-md">
										<CardContent className="p-6">
											<h4 className="text-cyan-400 dark:text-cyan-400 light:text-cyan-600 text-lg font-semibold mb-3 group-hover:text-cyan-300 dark:group-hover:text-cyan-300 light:group-hover:text-cyan-500 transition-colors">
												{area.title}
											</h4>
											<p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-base leading-relaxed">
												{area.description}
											</p>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
