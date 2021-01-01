import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppLayout from './AppLayout';
import { Home } from '../pages/Home';
import { Favorites } from '../pages/Favorites';
import RoutesPath from './RoutesPath';

const AppRouter: React.FC = () => {
	return (
		<BrowserRouter>
			<AppLayout>
				<Switch>
					<Route path={RoutesPath.ROOT} component={Home} exact />
					<Route path={RoutesPath.FAVORITE_BEERS} component={Favorites} />
				</Switch>
			</AppLayout>
		</BrowserRouter>
	);
};

export default AppRouter;
