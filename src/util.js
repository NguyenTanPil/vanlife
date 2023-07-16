export const isNotEmpty = (value) => {
	return value.length > 0;
};

export const requireAuth = () => {
	const isLoggedIn = false;

	if (!isLoggedIn) {
		window.location = '/app/login?message=You must log in first.';
	}
};
