import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isNotEmpty } from '../util';

const HostVans = () => {
	const [vans, setVans] = useState([]);

	useEffect(() => {
		const fetchHostVans = async () => {
			const res = await fetch('/api/host/vans');
			const data = await res.json();
			setVans(data.vans);
		};

		fetchHostVans();
	}, []);

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
