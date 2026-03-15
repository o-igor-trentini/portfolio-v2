import type { Context } from '@netlify/functions';

const GITHUB_USERNAME = 'o-igor-trentini';

const GRAPHQL_QUERY = `
query($username: String!) {
    user(login: $username) {
        contributionsCollection {
            contributionCalendar {
                weeks {
                    contributionDays {
                        contributionCount
                        date
                    }
                }
            }
        }
    }
}`;

async function fetchRepos(token: string | undefined): Promise<Response> {
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=100`, { headers });
}

async function fetchContributions(token: string): Promise<Response> {
    return fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            query: GRAPHQL_QUERY,
            variables: { username: GITHUB_USERNAME },
        }),
    });
}

export default async (request: Request, _context: Context) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const token = process.env.GITHUB_TOKEN;

    if (type === 'repos') {
        const response = await fetchRepos(token);
        const body = await response.text();

        const responseHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        // Repassa headers de rate limit
        const remaining = response.headers.get('X-RateLimit-Remaining');
        const reset = response.headers.get('X-RateLimit-Reset');
        if (remaining) responseHeaders['X-RateLimit-Remaining'] = remaining;
        if (reset) responseHeaders['X-RateLimit-Reset'] = reset;

        return new Response(body, {
            status: response.status,
            headers: responseHeaders,
        });
    }

    if (type === 'contributions') {
        if (!token) {
            return new Response(JSON.stringify({ data: null }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const response = await fetchContributions(token);
        const body = await response.text();

        return new Response(body, {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ error: 'Missing or invalid "type" query param' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
    });
};
