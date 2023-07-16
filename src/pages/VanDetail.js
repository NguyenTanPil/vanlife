import React from 'react';
import { Link, useLoaderData, useLocation } from 'react-router-dom';

export const vanDetailLoader = async ({ params }) => {
	const res = await fetch(`/api/vans/${params.id}`);
	const data = await res.json();
	return data.vans;
};

const VanDetail = () => {
	const {
		state: { search, type },
	} = useLocation();
	const van = useLoaderData();

	return (
		<div className='van-detail-container'>
			<Link
				to={`..?${search}`}
				relative='path'
				className='back-button'
			>
				&larr; <span>Back to {type} vans</span>
			</Link>

			<div className='van-detail'>
				<img
					src={van.imageUrl}
					alt=''
				/>
				<i className={`van-type ${van.type} selected`}>{van.type}</i>
				<h2>{van.name}</h2>
				<p className='van-price'>
					<span>${van.price}</span>/day
				</p>
				<p>{van.description}</p>
				<button className='link-button'>Rent this van</button>
			</div>
		</div>
	);
};

export default VanDetail;
