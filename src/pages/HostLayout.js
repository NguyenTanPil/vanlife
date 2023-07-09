import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const HostLayout = () => {
	const activeStyle = {
		fontWeight: 'bold',
		textDecoration: 'underline',
		color: '#161616',
	};

	return (
		<>
			<nav className='host-nav'>
				<NavLink
					end
					style={({ isActive }) => (isActive ? activeStyle : null)}
					to='/host'
				>
					Dashboard
				</NavLink>
				<NavLink
					end
					style={({ isActive }) => (isActive ? activeStyle : null)}
					to='income'
				>
					Income
				</NavLink>
				<NavLink
					end
					style={({ isActive }) => (isActive ? activeStyle : null)}
					to='vans'
				>
					Vans
				</NavLink>
				<NavLink
					end
					style={({ isActive }) => (isActive ? activeStyle : null)}
					to='reviews'
				>
					Reviews
				</NavLink>
			</nav>
			<Outlet />
		</>
	);
};

export default HostLayout;
