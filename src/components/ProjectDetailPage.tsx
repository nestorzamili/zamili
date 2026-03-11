import { motion } from 'framer-motion';
import { ArrowLeft, type LucideIcon, Mail } from 'lucide-react';
import type { ProjectCaseStudy } from '../content/projects';
import { ThemeProvider } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

const primaryEmail = 'nestor@zamili.dev';

function DetailHeader({ projectTitle }: { projectTitle: string }) {
	return (
		<header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90 light:border-gray-200 light:bg-white/95">
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
				<div className="flex items-center gap-3">
					<a
						href="/#projects"
						className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400 dark:text-gray-300 dark:hover:text-cyan-400 light:text-gray-600 light:hover:text-cyan-600"
					>
						<ArrowLeft size={16} />
						Back to Projects
					</a>
					<span className="hidden text-gray-600 dark:text-gray-600 light:text-gray-300 md:inline">
						/
					</span>
					<span className="hidden text-sm font-medium text-white dark:text-white light:text-slate-900 md:inline">
						{projectTitle}
					</span>
				</div>

				<div className="flex items-center gap-3">
					<ThemeToggle />
					<Button
						asChild
						className="hidden h-auto rounded-full bg-cyan-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-cyan-600 md:inline-flex"
					>
						<a
							href={`mailto:${primaryEmail}`}
							className="inline-flex items-center gap-2"
						>
							<Mail size={16} />
							Contact
						</a>
					</Button>
				</div>
			</nav>
		</header>
	);
}

function FocusCard({
	icon: Icon,
	label,
	detail,
}: {
	icon: LucideIcon;
	label: string;
	detail: string;
}) {
	return (
		<div className="flex items-start gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5 dark:border-slate-700/60 dark:bg-slate-900/60 light:border-gray-200 light:bg-gray-50">
			<div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/12">
				<Icon
					size={18}
					className="text-cyan-400 dark:text-cyan-400 light:text-cyan-600"
				/>
			</div>
			<div className="space-y-1">
				<p className="text-sm font-semibold text-white dark:text-white light:text-slate-900">
					{label}
				</p>
				<p className="text-sm leading-7 text-gray-400 dark:text-gray-400 light:text-gray-600">
					{detail}
				</p>
			</div>
		</div>
	);
}

export default function ProjectDetailPage({
	project,
}: {
	project: ProjectCaseStudy;
}) {
	const ProductLinkIcon = project.productLink.icon;

	return (
		<ThemeProvider>
			<div className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-white">
				<DetailHeader projectTitle={project.title} />

				<main className="pb-20 pt-28">
					<section className="mx-auto max-w-5xl px-6">
						<motion.div
							className="space-y-6"
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45 }}
						>
							<div className="space-y-4">
								<span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400 dark:text-cyan-400 light:text-cyan-600">
									{project.detailLabel}
								</span>
								<h1 className="text-4xl font-bold text-white dark:text-white light:text-slate-900 md:text-5xl">
									{project.title}
								</h1>
								<p className="max-w-3xl text-xl font-medium text-cyan-300 dark:text-cyan-300 light:text-cyan-700">
									{project.tagline}
								</p>
								<p className="max-w-3xl text-base leading-8 text-gray-300 dark:text-gray-300 light:text-gray-600 md:text-lg">
									{project.detailSummary}
								</p>
							</div>

							<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
								<Button
									asChild
									className="h-auto rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"
								>
									<a
										href={project.productLink.href}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2"
									>
										<ProductLinkIcon size={16} />
										{project.productLink.label}
									</a>
								</Button>
								<Button
									variant="outline"
									asChild
									className="h-auto rounded-full border-cyan-500/30 px-6 py-3 text-sm font-semibold text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-white dark:text-cyan-300 light:text-cyan-700"
								>
									<a href="/#contact">Discuss this kind of work</a>
								</Button>
							</div>

							<div className="space-y-3">
								<h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-400 dark:text-gray-400 light:text-gray-500">
									Core Stack
								</h2>
								<div className="flex flex-wrap gap-2">
									{project.stack.map((item) => (
										<Badge
											key={item}
											variant="secondary"
											className="border-slate-600 bg-slate-700 text-gray-300 hover:bg-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600 light:border-gray-300 light:bg-gray-200 light:text-gray-700 light:hover:bg-gray-300"
										>
											{item}
										</Badge>
									))}
								</div>
							</div>
						</motion.div>
					</section>

					<section className="mx-auto mt-10 max-w-5xl px-6">
						<div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
							<Card className="rounded-3xl border-slate-700 bg-slate-800 shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl light:border-gray-200 light:bg-white light:shadow-lg">
								<CardHeader className="space-y-2 pb-4 pt-7">
									<h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-400 dark:text-gray-400 light:text-gray-500">
										Overview
									</h2>
								</CardHeader>
								<CardContent className="space-y-5">
									{project.overview.map((paragraph) => (
										<p
											key={paragraph}
											className="text-sm leading-8 text-gray-300 dark:text-gray-300 light:text-gray-600 md:text-base"
										>
											{paragraph}
										</p>
									))}
								</CardContent>
							</Card>

							<Card className="rounded-3xl border-slate-700 bg-slate-800 shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl light:border-gray-200 light:bg-white light:shadow-lg">
								<CardHeader className="space-y-2 pb-4 pt-7">
									<h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-400 dark:text-gray-400 light:text-gray-500">
										Key Points
									</h2>
								</CardHeader>
								<CardContent>
									<ul className="space-y-3">
										{project.impact.map((item) => (
											<li
												key={item}
												className="flex items-start gap-3 text-sm leading-7 text-gray-300 dark:text-gray-300 light:text-gray-600"
											>
												<span className="mt-2 h-2 w-2 rounded-full bg-cyan-400 dark:bg-cyan-400 light:bg-cyan-600" />
												<span>{item}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</div>
					</section>

					<section className="mx-auto mt-10 max-w-5xl px-6">
						<Card className="rounded-3xl border-slate-700 bg-slate-800 shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl light:border-gray-200 light:bg-white light:shadow-lg">
							<CardHeader className="space-y-2 pb-4 pt-7">
								<h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-400 dark:text-gray-400 light:text-gray-500">
									Focus Areas
								</h2>
							</CardHeader>
							<CardContent className="grid gap-4 md:grid-cols-2">
								{project.focusAreas.map((area) => (
									<FocusCard
										key={area.label}
										icon={area.icon}
										label={area.label}
										detail={area.detail}
									/>
								))}
							</CardContent>
						</Card>
					</section>
				</main>
			</div>
		</ThemeProvider>
	);
}
