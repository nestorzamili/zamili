interface RateLimitEntry {
	timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 3;

function cleanupEntry(entry: RateLimitEntry, now: number): number[] {
	return entry.timestamps.filter((ts) => now - ts < WINDOW_MS);
}

export function checkRateLimit(identifier: string): {
	allowed: boolean;
	remaining: number;
	retryAfterMs?: number;
} {
	const now = Date.now();
	const entry = store.get(identifier);

	if (!entry) {
		store.set(identifier, { timestamps: [now] });
		return { allowed: true, remaining: MAX_REQUESTS - 1 };
	}

	const validTimestamps = cleanupEntry(entry, now);

	if (validTimestamps.length >= MAX_REQUESTS) {
		const oldestTimestamp = validTimestamps[0];
		const retryAfterMs = WINDOW_MS - (now - oldestTimestamp);
		return {
			allowed: false,
			remaining: 0,
			retryAfterMs,
		};
	}

	validTimestamps.push(now);
	store.set(identifier, { timestamps: validTimestamps });

	return {
		allowed: true,
		remaining: MAX_REQUESTS - validTimestamps.length,
	};
}

export function cleanupExpiredEntries(): void {
	const now = Date.now();
	for (const [key, entry] of store.entries()) {
		const validTimestamps = cleanupEntry(entry, now);
		if (validTimestamps.length === 0) {
			store.delete(key);
		} else {
			store.set(key, { timestamps: validTimestamps });
		}
	}
}
