import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => (
	<nav>
		<div className="nav-wrapper cyan darken-1 px1">
			<NavLink to="/" className="brand-logo">
				Redux + TypeScript
			</NavLink>
			<ul className="right hide-on-med-and-down">
				<li cy-data="home-nav-link">
					<NavLink to="/">Browse Beers</NavLink>
				</li>
				<li>
					<NavLink to="/favoritesBeers">Favorite Beers</NavLink>
				</li>
			</ul>
		</div>
	</nav>
);

export default Navbar;
