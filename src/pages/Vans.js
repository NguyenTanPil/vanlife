import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import { fetchVans } from '../api';

export const vansLoader = () => {
	return fetchVans();
};

const Vans = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const vans = useLoaderData();

	const typeFilter = searchParams.get('type');

	const displayVans = typeFilter ? vans.filter((van) => isEqual(van.type, typeFilter)) : vans;

	const vanElements = displayVans.map((van) => (
		<div
			key={van.id}
			className='van-tile'
		>
			<Link
				to={van.id}
				state={{ search: searchParams.toString(), type: typeFilter }}
			>
				<img
					src={van.imageUrl}
					alt=''
				/>
				<div className='van-info'>
					<h3>{van.name}</h3>
					<p>
						${van.price}
						<span>/day</span>
					</p>
				</div>
				<i className={`van-type ${van.type} selected`}>{van.type}</i>
			</Link>
		</div>
	));

	return (
		<div className='van-list-container'>
			<h1>Explore our van options</h1>
			<div className='van-list-filter-buttons'>
				<button
					onClick={() => setSearchParams({ type: 'simple' })}
					className={`van-type simple ${isEqual(typeFilter, 'simple') ? 'selected' : ''}`}
				>
					Simple
				</button>
				<button
					onClick={() => setSearchParams({ type: 'luxury' })}
					className={`van-type luxury ${isEqual(typeFilter, 'luxury') ? 'selected' : ''}`}
				>
					Luxury
				</button>
				<button
					onClick={() => setSearchParams({ type: 'rugged' })}
					className={`van-type rugged ${isEqual(typeFilter, 'rugged') ? 'selected' : ''}`}
				>
					Rugged
				</button>
				{typeFilter && (
					<button
						onClick={() => setSearchParams({})}
						className='van-type clear-filters'
					>
						Clear Filter
					</button>
				)}
			</div>
			<div className='van-list'>{vanElements}</div>
		</div>
	);
};

export default Vans;
