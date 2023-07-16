import React from 'react';
import { Link, NavLink, Outlet, useLoaderData } from 'react-router-dom';

export const hostVanDetailLoader = async ({ params }) => {
	const res = await fetch(`/api/host/vans/${params.id}`);
	const data = await res.json();
	return data.vans;
};

const HostVanDetail = () => {
	const currentVan = useLoaderData();

	const activeStyles = {
		fontWeight: 'bold',
		textDecoration: 'underline',
		color: '#161616',
	};

	return (
		<>
			{currentVan ? (
				<section>
					<Link
						to='..'
						relative='path'
						className='back-button'
					>
						&larr; <span>Back to all vans</span>
					</Link>

					<div className='host-van-detail-layout-container'>
						<div className='host-van-detail'>
							<img
								src={currentVan.imageUrl}
								alt=''
							/>
							<div className='host-van-detail-info-text'>
								<i className={`van-type van-type-${currentVan.type}`}>{currentVan.type}</i>
								<h3>{currentVan.name}</h3>
								<h4>${currentVan.price}/day</h4>
							</div>
						</div>

						<nav className='host-van-detail-nav'>
							<NavLink
								to='.'
								end
								style={({ isActive }) => (isActive ? activeStyles : null)}
							>
								Details
							</NavLink>
							<NavLink
								to='pricing'
								style={({ isActive }) => (isActive ? activeStyles : null)}
							>
								Pricing
							</NavLink>
							<NavLink
								to='photos'
								style={({ isActive }) => (isActive ? activeStyles : null)}
							>
								Photos
							</NavLink>
						</nav>
						<Outlet context={{ currentVan }} />
					</div>
				</section>
			) : (
				<h3>Loading...</h3>
			)}
		</>
	);
};

export default HostVanDetail;
