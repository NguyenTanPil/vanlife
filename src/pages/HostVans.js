import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { isNotEmpty, requireAuth } from '../util';

export const hostVansLoader = async () => {
	await requireAuth();

	const res = await fetch('/api/host/vans');
	const data = await res.json();
	return data.vans;
};

const HostVans = () => {
	const vans = useLoaderData();

	function renderVanElements(vans) {
		const hostVansEls = vans.map((van) => (
			<Link
				to={van.id}
				key={van.id}
				className='host-van-link-wrapper'
			>
				<div
					className='host-van-single'
					key={van.id}
				>
					<img
						src={van.imageUrl}
						alt={`${van.name}`}
					/>
					<div className='host-van-info'>
						<h3>{van.name}</h3>
						<p>${van.price}/day</p>
					</div>
				</div>
			</Link>
		));

		return (
			<>
				{isNotEmpty(vans) ? (
					<div className='host-vans-list'>
						<section>{hostVansEls}</section>
					</div>
				) : (
					<h3>Loading...</h3>
				)}
			</>
		);
	}

	return (
		<section>
			<h2 className='host-vans-title'>Your listed vans</h2>
			{renderVanElements(vans)}
		</section>
	);
};

export default HostVans;
