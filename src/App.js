import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import Root from './pages/Root';
import './server';
import Vans, { vansLoader } from './pages/Vans';
import VanDetail, { vanDetailLoader } from './pages/VanDetail';
import Dashboard, { dashboardLoader } from './pages/Dashboard';
import Income from './pages/Income';
import Reviews from './pages/Reviews';
import HostLayout from './pages/HostLayout';
import HostVans, { hostVansLoader } from './pages/HostVans';
import HostVanDetail, { hostVanDetailLoader } from './pages/HostVanDetail';
import HostVanInfo from './pages/HostVanInfo';
import HostVanPricing from './pages/HostVanPricing';
import HostVanPhotos from './pages/HostVanPhotos';
import NotFound from './pages/NotFound';
import VansError from './pages/VansError';
import Login, { loginAction, loginLoader } from './pages/Login';

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Root />,
			children: [
				{
					path: 'login',
					loader: loginLoader,
					action: loginAction,
					element: <Login />,
				},
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
							loader: vansLoader,
							element: <Vans />,
							errorElement: <VansError />,
						},
						{
							path: ':id',
							loader: vanDetailLoader,
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
							errorElement: <>No</>,
							loader: dashboardLoader,
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
									loader: hostVansLoader,
									element: <HostVans />,
								},
								{
									path: ':id',
									loader: hostVanDetailLoader,
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
		{
			path: '*',
			element: <NotFound />,
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
