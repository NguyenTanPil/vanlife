import React from 'react';
import { useLoaderData, useNavigation, Form, redirect, useActionData } from 'react-router-dom';
import { loginUser } from '../api';

export function loginLoader({ request }) {
	const newUrl = new URL(request.url);
	return newUrl.searchParams.get('message');
}

export async function loginAction({ request }) {
	const formData = await request.formData();
	const email = formData.get('email');
	const password = formData.get('password');
	const pathname = new URL(request.url).searchParams.get('redirectTo') || '/host';

	try {
		const data = await loginUser({ email, password });
		console.log({ data });
		localStorage.setItem('loggedin', true);
		return redirect(pathname);
	} catch (err) {
		console.log('error');
		return err.message;
	}
}

export default function Login() {
	const errorMessage = useActionData();
	const message = useLoaderData();
	const navigation = useNavigation();

	console.log({ errorMessage });

	return (
		<div className='login-container'>
			<h1>Sign in to your account</h1>
			{message && <h3 className='red'>{message}</h3>}
			{errorMessage && <h3 className='red'>{errorMessage}</h3>}
			<Form
				method='post'
				className='login-form'
				replace
			>
				<input
					name='email'
					type='email'
					placeholder='Email address'
				/>
				<input
					name='password'
					type='password'
					placeholder='Password'
				/>
				<button disabled={navigation.state === 'submitting'}>
					{navigation.state === 'submitting' ? 'Logging in...' : 'Log in'}
				</button>
			</Form>
		</div>
	);
}
