import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import Root from './pages/Root';
import './server';
import Vans from './pages/Vans';
import VanDetail from './pages/VanDetail';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Reviews from './pages/Reviews';
import HostLayout from './pages/HostLayout';
import HostVans from './pages/HostVans';
import HostVanDetail from './pages/HostVanDetail';
import HostVanInfo from './pages/HostVanInfo';
import HostVanPricing from './pages/HostVanPricing';
import HostVanPhotos from './pages/HostVanPhotos';

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Root />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: 'about',
					element: <About />,
				},
				{
					path: 'vans',
					children: [
						{
							index: true,
							element: <Vans />,
						},
						{
							path: ':id',
							element: <VanDetail />,
						},
					],
				},
				{
					path: 'host',
					element: <HostLayout />,
					children: [
						{
							index: true,
							element: <Dashboard />,
						},
						{
							path: 'income',
							element: <Income />,
						},
						{
							path: 'reviews',
							element: <Reviews />,
						},
						{
							path: 'vans',
							element: <Outlet />,
							children: [
								{
									index: true,
									element: <HostVans />,
								},
								{
									path: ':id',
									element: <HostVanDetail />,
									children: [
										{
											index: true,
											element: <HostVanInfo />,
										},
										{
											path: 'pricing',
											element: <HostVanPricing />,
										},
										{
											path: 'photos',
											element: <HostVanPhotos />,
										},
									],
								},
							],
						},
					],
				},
			],
		},
	],
	{
		basename: '/app',
	},
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
