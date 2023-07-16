import React from 'react';
import { Outlet } from 'react-router-dom';
import { requireAuth } from '../util';

export const dashboardLoader = async () => {
	return await requireAuth();
};

const Dashboard = () => {
	return (
		<div>
			Dashboard
			<Outlet />
		</div>
	);
};

export default Dashboard;
