import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VanDetail = () => {
	const params = useParams();
	console.log({ params });

	const [van, setVan] = useState({});

	useEffect(() => {
		const fetchVen = async () => {
			const res = await fetch(`/api/vans/${params.id}`);
			const data = await res.json();
			setVan(data.vans);
		};
		fetchVen();
	}, []);

	return (
		<div className='van-detail-container'>
			{/* <Link
				to={`..${search}`}
				relative='path'
				className='back-button'
			>
				&larr; <span>Back to {type} vans</span>
			</Link> */}

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
