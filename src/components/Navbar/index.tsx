import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import './style.scss';
import { navbarLinks } from './config';

const NavigationBar: React.FC = () => (
	<Navbar bg="dark" variant="dark" fixed="top" className="navbar-container">
		<Navbar.Brand as={NavLink} to="/">
			Beer Buddy
		</Navbar.Brand>
		<Nav className="mr-auto">
			{
				navbarLinks.map((link) => (
					// eslint-disable-next-line react/jsx-key
					<Nav.Link as={NavLink} to={link.to}>
						{link.label}
					</Nav.Link>
				))
			}
		</Nav>
	</Navbar>
);

export default NavigationBar;
