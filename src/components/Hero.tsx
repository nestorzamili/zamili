import { Image } from '@unpic/react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Badge } from './ui/badge';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
		},
	},
};

const imageVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.8,
		},
	},
};

const socialLinks = [
	{ href: 'https://github.com/nestorzamili', icon: Github, label: 'GitHub' },
	{
		href: 'https://www.linkedin.com/in/nestor-zamili',
		icon: Linkedin,
		label: 'LinkedIn',
	},
	{ href: 'mailto:nestorzamili@gmail.com', icon: Mail, label: 'Email' },
];

export default function Hero() {
	return (
		<section
			id="hero"
			className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-white"
		>
			<div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_br,rgba(0,0,0,0)_0%,rgba(8,145,178,0.15)_20%,rgba(2,6,23,1)_60%)] dark:bg-[linear-gradient(to_br,rgba(0,0,0,0)_0%,rgba(8,145,178,0.15)_20%,rgba(2,6,23,1)_60%)] light:bg-[linear-gradient(to_br,rgba(255,255,255,0)_0%,rgba(217,249,255,0.6)_30%,rgba(255,255,255,1)_70%)]" />

			<div className="relative max-w-6xl mx-auto px-6 py-24 md:py-20">
				<div className="grid md:grid-cols-2 gap-16 items-center">
					<motion.div
						className="order-2 md:order-1"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						<motion.div variants={itemVariants}>
							<Badge className="mb-6 px-4 py-2 text-sm bg-cyan-600 text-white border-none">
								Software Engineer
							</Badge>
						</motion.div>

						<motion.h1
							variants={itemVariants}
							className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white dark:text-white light:text-slate-900 mb-6 leading-tight"
						>
							Nestor Zamili
						</motion.h1>

						<motion.div variants={itemVariants}>
							<h2 className="text-xl sm:text-2xl md:text-3xl text-cyan-400 dark:text-cyan-400 light:text-cyan-600 font-medium mb-8">
								Platform & Delivery
							</h2>
						</motion.div>

						<motion.p
							variants={itemVariants}
							className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
						>
							I work at the intersection of applications and production systems.
							My focus is designing reliable deployment pipelines, operating
							Kubernetes workloads, and troubleshooting real production issues.
						</motion.p>

						<motion.p
							variants={itemVariants}
							className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
						>
							Currently working in a deployment-focused DevOps team. Building
							production-first side projects to sharpen system thinking.
						</motion.p>

						<motion.div
							variants={itemVariants}
							className="flex items-center gap-5"
						>
							{socialLinks.map((link) => {
								const Icon = link.icon;
								return (
									<motion.a
										key={link.label}
										href={link.href}
										target={
											link.href.startsWith('mailto') ? undefined : '_blank'
										}
										rel={
											link.href.startsWith('mailto')
												? undefined
												: 'noopener noreferrer'
										}
										className="p-4 bg-slate-800 dark:bg-slate-800 light:bg-gray-100 rounded-xl text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-cyan-600 hover:bg-cyan-600 dark:hover:bg-cyan-600 light:hover:bg-cyan-50 transition-all shadow-lg"
										aria-label={link.label}
										whileHover={{ scale: 1.1, y: -3 }}
										whileTap={{ scale: 0.95 }}
									>
										<Icon size={28} />
									</motion.a>
								);
							})}
						</motion.div>
					</motion.div>

					<motion.div
						className="order-1 md:order-2 flex justify-center"
						variants={imageVariants}
						initial="hidden"
						animate="visible"
					>
						<div className="relative">
							<motion.div
								className="absolute -inset-6 bg-cyan-500/30 dark:bg-cyan-500/30 light:bg-cyan-200/50 rounded-full blur-3xl"
								animate={{
									scale: [1, 1.1, 1],
									opacity: [0.4, 0.6, 0.4],
								}}
								transition={{
									duration: 4,
									repeat: Number.POSITIVE_INFINITY,
									ease: 'easeInOut',
								}}
							/>
							<motion.div
								whileHover={{ scale: 1.03 }}
								transition={{ duration: 0.3 }}
							>
								<Image
									src="/profile.png"
									alt="Nestor Zamili"
									width={320}
									height={320}
									priority={true}
									fetchPriority="high"
									className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full object-cover object-[50%_35%] sm:object-[50%_30%] md:object-[50%_25%] border-4 border-cyan-500/50 dark:border-cyan-500/50 light:border-cyan-400 shadow-2xl shadow-cyan-500/20 dark:shadow-cyan-500/20 light:shadow-cyan-200/50"
								/>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
