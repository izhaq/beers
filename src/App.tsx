import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { Navbar } from './components';
import { Favorites } from './pages/Favorites';
import { Home } from './pages/Home';
import { queryClient } from './react-query.config';

const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<div className="app-content">
					<div className="navbar-container">
						<Navbar />
					</div>
					<div className="app-body">
						<React.Suspense fallback={<h1>Loading projects...</h1>}>
							<Switch>
								<Route path="/" component={Home} exact />
								<Route path="/favoritesBeers" component={Favorites} />
							</Switch>
						</React.Suspense>
					</div>
				</div>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default App;
