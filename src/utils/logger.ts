interface LogInfo {
	timestamp: string;
	status: number;
	clientIp: string;
	country?: string;
	method: string;
	path: string;
}

function formatTimestamp(): string {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function getClientIp(request: Request): string {
	const cfIp = request.headers.get('CF-Connecting-IP');
	if (cfIp) return cfIp;

	const xForwardedFor = request.headers.get('X-Forwarded-For');
	if (xForwardedFor) return xForwardedFor.split(',')[0].trim();

	const xRealIp = request.headers.get('X-Real-IP');
	if (xRealIp) return xRealIp;

	return 'unknown';
}

export function getClientCountry(request: Request): string | undefined {
	return request.headers.get('CF-IPCountry') || undefined;
}

export function logRequest(info: Omit<LogInfo, 'timestamp'>): void {
	const countryPart = info.country ? ` (${info.country})` : '';
	const logLine = `${formatTimestamp()} | ${info.status} | ${info.clientIp}${countryPart} | ${info.method} ${info.path}`;
	console.log(logLine);
}

