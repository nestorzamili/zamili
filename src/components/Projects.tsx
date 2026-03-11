import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useRef, useState } from 'react';
import { allProjects, getCaseStudyHref } from '../content/projects';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

export default function Projects() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const getScrollStride = () => {
		const container = scrollContainerRef.current;
		if (!container) {
			return 0;
		}

		const cards = Array.from(container.children) as HTMLElement[];
		if (cards.length === 0) {
			return 0;
		}
		if (cards.length === 1) {
			return cards[0]?.offsetWidth ?? 0;
		}

		const firstCard = cards[0];
		const secondCard = cards[1];
		return secondCard.offsetLeft - firstCard.offsetLeft;
	};

	const scrollToIndex = (index: number) => {
		const container = scrollContainerRef.current;
		if (!container) {
			return;
		}

		const stride = getScrollStride();
		if (stride <= 0) {
			return;
		}

		container.scrollTo({
			left: index * stride,
			behavior: 'smooth',
		});
		setActiveIndex(index);
	};

	const handleScroll = () => {
		const container = scrollContainerRef.current;
		if (!container) {
			return;
		}

		const stride = getScrollStride();
		if (stride <= 0) {
			return;
		}

		const nextIndex = Math.round(container.scrollLeft / stride);
		setActiveIndex(Math.min(Math.max(nextIndex, 0), allProjects.length - 1));
	};

	return (
		<section
			id="projects"
			className="overflow-hidden bg-slate-950 py-24 dark:bg-slate-950 light:bg-white md:py-20"
		>
			<div className="mx-auto max-w-6xl px-6">
				<motion.div
					className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<div>
						<motion.h2
							className="mb-4 text-3xl font-bold text-white dark:text-white light:text-slate-900 sm:text-4xl md:text-5xl"
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
							className="max-w-3xl text-lg text-gray-300 dark:text-gray-300 light:text-gray-600"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							Short summaries live here. Each project card leads to a dedicated
							case study if you want the fuller context.
						</motion.p>
					</div>

					<div className="flex items-center gap-3">
						<Button
							variant="outline"
							size="icon"
							onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
							disabled={activeIndex === 0}
							className="h-11 w-11 rounded-full border-slate-700 text-gray-400 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-white disabled:opacity-30 dark:border-slate-700 dark:text-gray-400 dark:hover:border-cyan-500 dark:hover:text-white light:border-gray-300 light:text-gray-500 light:hover:border-cyan-500 light:hover:text-cyan-700"
						>
							<ChevronLeft size={20} />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={() =>
								scrollToIndex(Math.min(activeIndex + 1, allProjects.length - 1))
							}
							disabled={activeIndex === allProjects.length - 1}
							className="h-11 w-11 rounded-full border-slate-700 text-gray-400 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-white disabled:opacity-30 dark:border-slate-700 dark:text-gray-400 dark:hover:border-cyan-500 dark:hover:text-white light:border-gray-300 light:text-gray-500 light:hover:border-cyan-500 light:hover:text-cyan-700"
						>
							<ChevronRight size={20} />
						</Button>
					</div>
				</motion.div>
			</div>

			<div className="relative">
				<div
					ref={scrollContainerRef}
					onScroll={handleScroll}
					className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 pt-4 md:px-[calc((100vw-72rem)/2+1.5rem)]"
					style={{
						scrollbarWidth: 'none',
						msOverflowStyle: 'none',
					}}
				>
					{allProjects.map((project, index) => {
						const ProductLinkIcon = project.productLink.icon;

						return (
							<motion.article
								key={project.slug}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-80px' }}
								transition={{ delay: index * 0.08, duration: 0.5 }}
								className="w-[calc(100vw-3rem)] shrink-0 snap-center sm:w-[33rem] lg:w-[36rem]"
							>
								<Card className="h-full rounded-3xl border-slate-700 bg-slate-800 shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl light:border-gray-200 light:bg-white light:shadow-lg">
									<CardHeader className="space-y-4 pb-4 pt-7">
										<div className="space-y-3">
											<span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400 dark:text-cyan-400 light:text-cyan-600">
												Case Study
											</span>
											<h3 className="text-2xl font-bold text-white dark:text-white light:text-slate-900">
												{project.title}
											</h3>
											<p className="text-base font-medium text-cyan-300 dark:text-cyan-300 light:text-cyan-700">
												{project.tagline}
											</p>
											<p className="text-sm leading-7 text-gray-300 dark:text-gray-300 light:text-gray-600 md:text-base">
												{project.homepageSummary}
											</p>
										</div>
									</CardHeader>

									<CardContent className="space-y-6">
										<div className="flex flex-col gap-3 pt-1 sm:flex-row">
											<Button
												variant="outline"
												asChild
												className="h-auto gap-2 rounded-full border-cyan-500/30 px-5 py-3 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-white dark:text-cyan-300 light:text-cyan-700"
											>
												<a
													href={getCaseStudyHref(project.slug)}
													aria-label={`Read the ${project.title} case study`}
												>
													<FileText size={16} />
													Read Case Study
												</a>
											</Button>
											<Button
												variant="outline"
												asChild
												className="h-auto gap-2 rounded-full border-cyan-500/30 px-5 py-3 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-white dark:text-cyan-300 light:text-cyan-700"
											>
												<a
													href={project.productLink.href}
													target="_blank"
													rel="noopener noreferrer"
													aria-label={project.productLink.label}
												>
													<ProductLinkIcon size={16} />
													{project.productLink.label}
												</a>
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.article>
						);
					})}
				</div>

				<div className="mt-2 flex justify-center gap-2">
					{allProjects.map((project, index) => (
						<button
							type="button"
							key={project.slug}
							onClick={() => scrollToIndex(index)}
							className={`h-2 rounded-full transition-all duration-300 ${
								activeIndex === index
									? 'w-8 bg-cyan-500'
									: 'w-2 bg-slate-700 hover:bg-slate-600'
							}`}
							aria-label={`Go to ${project.title}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
