import handler, { createServerEntry } from '@tanstack/react-start/server-entry';
import { getClientIp, logRequest } from './utils/logger';

export default createServerEntry({
	async fetch(request) {
		const url = new URL(request.url);
		const clientIp = getClientIp(request);

		if (url.pathname === '/api/health' && request.method === 'GET') {
			const response = new Response(
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
			logRequest({
				method: request.method,
				path: url.pathname,
				status: response.status,
				clientIp,
			});
			return response;
		}

		const response = await handler.fetch(request);
		logRequest({
			method: request.method,
			path: url.pathname,
			status: response.status,
			clientIp,
		});
		return response;
	},
});
