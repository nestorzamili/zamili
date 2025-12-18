import { motion } from 'framer-motion';
import { Server } from 'lucide-react';
import {
	SiBitbucket,
	SiDocker,
	SiGit,
	SiGooglecloud,
	SiHelm,
	SiJenkins,
	SiKubernetes,
	SiLinux,
	SiPostgresql,
	SiReact,
	SiTypescript,
} from 'react-icons/si';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.1,
		},
	},
};

const categoryVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, x: -10 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
		},
	},
};

const techCategories = [
	{
		title: 'Container & Orchestration',
		items: [
			{
				name: 'Kubernetes',
				icon: SiKubernetes,
				level: 'Operations',
				color: '#326CE5',
			},
			{ name: 'Docker', icon: SiDocker, level: 'Daily Use', color: '#2496ED' },
			{ name: 'Helm', icon: SiHelm, level: 'Deployment', color: '#0ACFF0' },
		],
	},
	{
		title: 'CI/CD & Version Control',
		items: [
			{
				name: 'Jenkins',
				icon: SiJenkins,
				level: 'Pipelines',
				color: '#D24939',
			},
			{
				name: 'Bitbucket',
				icon: SiBitbucket,
				level: 'Daily Use',
				color: '#0052CC',
			},
			{ name: 'Git', icon: SiGit, level: 'Daily Use', color: '#F05032' },
		],
	},
	{
		title: 'Infrastructure',
		items: [
			{
				name: 'GKE',
				icon: SiGooglecloud,
				level: 'K8s Managed',
				color: '#4285F4',
			},
			{
				name: 'On-Prem K8s',
				icon: Server,
				level: 'Operations',
				color: '#64748b',
			},
			{ name: 'Linux', icon: SiLinux, level: 'Daily Use', color: '#FCC624' },
		],
	},
	{
		title: 'Development',
		items: [
			{ name: 'React', icon: SiReact, level: 'Fullstack', color: '#61DAFB' },
			{
				name: 'TypeScript',
				icon: SiTypescript,
				level: 'Primary',
				color: '#3178C6',
			},
			{
				name: 'PostgreSQL',
				icon: SiPostgresql,
				level: 'Operations',
				color: '#4169E1',
			},
		],
	},
];

export default function TechStack() {
	return (
		<section className="py-24 md:py-20 bg-slate-950 dark:bg-slate-950 light:bg-white">
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
					Tech Stack
				</motion.h2>

				<motion.div
					className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-50px' }}
				>
					{techCategories.map((category) => (
						<motion.div
							key={category.title}
							className="space-y-5"
							variants={categoryVariants}
						>
							<h3 className="text-lg font-semibold text-cyan-400 dark:text-cyan-400 light:text-cyan-600 border-b-2 border-cyan-400/30 dark:border-cyan-400/30 light:border-cyan-200 pb-3">
								{category.title}
							</h3>
							<motion.div
								className="space-y-4"
								variants={containerVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
							>
								{category.items.map((item) => {
									const Icon = item.icon;
									return (
										<motion.div
											key={item.name}
											variants={itemVariants}
											whileHover={{ x: 5 }}
											className="flex items-center gap-4 p-4 bg-slate-900 dark:bg-slate-900 light:bg-gray-50 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-gray-100 transition-colors group cursor-default border border-slate-800 dark:border-slate-800 light:border-gray-200"
										>
											<motion.div
												className="p-3 bg-slate-800 dark:bg-slate-800 light:bg-white rounded-lg transition-all shadow-sm"
												whileHover={{ rotate: 5, scale: 1.05 }}
											>
												<Icon size={22} style={{ color: item.color }} />
											</motion.div>
											<div>
												<p className="text-white dark:text-white light:text-slate-900 font-medium text-base">
													{item.name}
												</p>
												<p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-sm">
													{item.level}
												</p>
											</div>
										</motion.div>
									);
								})}
							</motion.div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
