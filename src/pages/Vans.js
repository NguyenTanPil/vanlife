import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchVans } from '../api';

const Vans = () => {
	const [vans, setVans] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [error, setError] = useState('');

	const typeFilter = searchParams.get('type');

	useEffect(() => {
		const loadVans = async () => {
			setLoading(true);
			try {
				const data = await fetchVans();
				console.log({ data });
				setVans(data);
			} catch (error) {
				setError(error._bodyText);
			} finally {
				setLoading(false);
			}
		};

		loadVans();
	}, []);

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

	if (error) {
		return <h2>{error}</h2>;
	}

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

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
