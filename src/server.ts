import handler, { createServerEntry } from '@tanstack/react-start/server-entry';
import { getClientCountry, getClientIp, logRequest } from './utils/logger';

export default createServerEntry({
	async fetch(request) {
		const url = new URL(request.url);
		const clientIp = getClientIp(request);
		const country = getClientCountry(request);

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
			const isLocalhost = clientIp === 'unknown' || clientIp === '127.0.0.1' || clientIp === '::1';
			if (!isLocalhost) {
				logRequest({
					method: request.method,
					path: url.pathname,
					status: response.status,
					clientIp,
					country,
				});
			}
			return response;
		}

		const response = await handler.fetch(request);
		logRequest({
			method: request.method,
			path: url.pathname,
			status: response.status,
			clientIp,
			country,
		});
		return response;
	},
});
