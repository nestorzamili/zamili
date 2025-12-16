import handler, { createServerEntry } from '@tanstack/react-start/server-entry';

export default createServerEntry({
	fetch(request) {
		const url = new URL(request.url);

		if (url.pathname === '/api/health' && request.method === 'GET') {
			return new Response(
				JSON.stringify({
					status: 'ok',
					timestamp: new Date().toISOString(),
					uptime: process.uptime(),
				}),
				{
					status: 200,
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
		}

		return handler.fetch(request);
	},
});
