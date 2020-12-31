import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import './style.scss';

const NavigationBar: React.FC = () => (
	<Navbar bg="dark" variant="dark" fixed="top">
		<Navbar.Brand as={NavLink} to="/">
			Beer Buddy
		</Navbar.Brand>
		<Nav className="mr-auto">
			<Nav.Link as={NavLink} to="/">
				Browse Beers
			</Nav.Link>
			<Nav.Link as={NavLink} to="/favoritesBeers">
				Favorite Beers
			</Nav.Link>
		</Nav>
	</Navbar>
);

export default NavigationBar;
