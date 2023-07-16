export const fetchVans = async () => {
	const res = await fetch('/api/vans');

	if (!res.ok) {
		throw new Response('Error fetching vans', {
			statusText: res.statusText,
			status: res.status,
		});
	}
	const data = await res.json();
	return data.vans;
};

export async function loginUser(creds) {
	const res = await fetch('/api/login', { method: 'post', body: JSON.stringify(creds) });
	const data = await res.json();

	if (!res.ok) {
		throw {
			message: data.message,
			statusText: res.statusText,
			status: res.status,
		};
	}

	return data;
}
