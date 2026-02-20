const BASE_PATH = '/.netlify/functions';

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function fetchFunction<T>(name: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${BASE_PATH}/${name}`, window.location.origin);

    if (params) {
        Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new ApiError(`Function ${name} failed`, response.status);
    }

    return response.json();
}
