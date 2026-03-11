import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProjectDetailPage from './components/ProjectDetailPage';
import { getProjectBySlug, type ProjectSlug } from './content/projects';
import './styles.css';

export function mountProjectPage(slug: ProjectSlug) {
	const rootElement = document.getElementById('root');

	if (!rootElement) {
		throw new Error('Root element not found');
	}

	const project = getProjectBySlug(slug);

	createRoot(rootElement).render(
		<StrictMode>
			<ProjectDetailPage project={project} />
		</StrictMode>,
	);
}
