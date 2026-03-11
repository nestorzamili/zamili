import {
	ExternalLink,
	GitBranch,
	LayoutPanelTop,
	type LucideIcon,
	MessageSquare,
	ServerCog,
} from 'lucide-react';

export type ProjectSlug = 'naoto' | 'prakarsa';

export interface ProjectFocusArea {
	icon: LucideIcon;
	label: string;
	detail: string;
}

export interface ProjectLink {
	href: string;
	label: string;
	icon: LucideIcon;
}

export interface ProjectCaseStudy {
	slug: ProjectSlug;
	homepageLabel: string;
	detailLabel: string;
	title: string;
	tagline: string;
	homepageSummary: string;
	detailSummary: string;
	overview: string[];
	focusAreas: ProjectFocusArea[];
	impact: string[];
	stack: string[];
	productLink: ProjectLink;
}

const caseStudyBasePath = '/projects';

export const projectCaseStudies: Record<ProjectSlug, ProjectCaseStudy> = {
	naoto: {
		slug: 'naoto',
		homepageLabel: 'Featured Case Study',
		detailLabel: 'System Case Study',
		title: 'Naoto',
		tagline:
			'Family tree product built across the app, API, and marketing site.',
		homepageSummary:
			'Naoto is a family tree product with a main app, a Go API, and an Astro marketing site, each serving a different part of the overall experience.',
		detailSummary:
			'Naoto is a family tree product built as a complete system rather than a single frontend. The work spans the main application, a Go backend API, and a separate Astro marketing site so the public-facing layer stays lightweight while the product surface can handle more involved workflows.',
		overview: [
			'The project is useful as a case study because it shows product thinking across boundaries: app UX, backend capability, and a separate marketing layer with a lighter runtime profile.',
			'Rather than treating the frontend, API, and marketing site as isolated deliverables, Naoto is easier to understand as one product with different surfaces and different jobs.',
		],
		focusAreas: [
			{
				icon: LayoutPanelTop,
				label: 'Application',
				detail:
					'React 19, Vite, D3, React Query, and Zustand for interactive genealogy workflows.',
			},
			{
				icon: ServerCog,
				label: 'Backend',
				detail:
					'Go, Fiber, PostgreSQL, Redis, and Cloudinary for core product capabilities.',
			},
			{
				icon: ExternalLink,
				label: 'Marketing Site',
				detail:
					'Astro-based marketing site separated from the main application so the public-facing content stays lightweight and focused.',
			},
		],
		impact: [
			'Keeps marketing and product concerns separate, so each surface can be optimized for its own runtime needs.',
			'Supports workspace access, invitations, lineage exploration, media handling, and broader family management workflows.',
			'Shows delivery thinking across frontend, backend, and deployment boundaries without treating them as disconnected pieces.',
		],
		stack: [
			'React 19',
			'TypeScript',
			'Vite',
			'D3',
			'React Query',
			'Zustand',
			'Go',
			'Fiber',
			'PostgreSQL',
			'Redis',
			'Astro',
		],
		productLink: {
			href: 'https://naoto.id',
			label: 'View Product Site',
			icon: ExternalLink,
		},
	},
	prakarsa: {
		slug: 'prakarsa',
		homepageLabel: 'Supporting Project',
		detailLabel: 'Product Case Study',
		title: 'Prakarsa',
		tagline:
			'Student collaboration platform where I handled the frontend and its deployment.',
		homepageSummary:
			'Prakarsa helps students publish ideas, discover collaborators, show profile and portfolio context, and move into direct collaboration.',
		detailSummary:
			'Prakarsa is a student collaboration platform built around idea sharing, partner discovery, and direct conversation. My contribution focused on the frontend surface: shaping the user-facing experience and handling how the frontend is built and deployed.',
		overview: [
			'From the live product, the core journey is clear: describe an idea, communicate what kind of collaborator is needed, help others understand your profile and interests, then move into a direct conversation when there is alignment.',
			'What makes this project relevant in the portfolio is the frontend responsibility behind that flow: making the product understandable, usable, and deployable as one coherent user-facing surface.',
		],
		focusAreas: [
			{
				icon: LayoutPanelTop,
				label: 'Frontend Experience',
				detail:
					'Built the user-facing product flow for profiles, portfolio context, idea discovery, and collaboration entry points.',
			},
			{
				icon: MessageSquare,
				label: 'Product UI Translation',
				detail:
					'Turned the collaboration concept into screens and interaction patterns that make idea sharing and partner discovery easier to follow.',
			},
			{
				icon: GitBranch,
				label: 'Frontend Deployment',
				detail:
					'Handled the frontend delivery path so the product can be built, shipped, and served reliably as a production-facing web surface.',
			},
			{
				icon: ServerCog,
				label: 'System Awareness',
				detail:
					'Worked from the frontend boundary while staying aware of the broader product flow and integration points needed for collaboration features.',
			},
		],
		impact: [
			'Turns idea discovery, partner search, and first contact into one clearer product journey instead of scattered social channels.',
			'Gives students enough profile and portfolio context to make collaboration decisions with more confidence.',
			'Shows frontend ownership that goes beyond screens alone, including how the frontend is prepared and deployed for actual use.',
		],
		stack: ['Next.js', 'TypeScript', 'Frontend Delivery', 'Product UI'],
		productLink: {
			href: 'https://prakarsa.id/',
			label: 'Visit Live Product',
			icon: ExternalLink,
		},
	},
};

export const featuredProject = projectCaseStudies.naoto;
export const supportingProjects = [projectCaseStudies.prakarsa];
export const allProjects = Object.values(projectCaseStudies);

export function getCaseStudyHref(slug: ProjectSlug): string {
	return `${caseStudyBasePath}/${slug}/`;
}

export function getProjectBySlug(slug: ProjectSlug): ProjectCaseStudy {
	return projectCaseStudies[slug];
}
