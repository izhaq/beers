import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Navbar } from '../components';
import './style.scss';

interface Props{
	children: any;
}

const AppLayout: React.FC<Props> = (props: Props) => {
	const { children } = props;
	return (
		<Container fluid>
			<Row className="nav-bar-row">
				<Col className="col-12">
					<Navbar />
				</Col>
			</Row>
			<Row className="main-app-row">
				<Col className="main-app-col">
					{children}
				</Col>
			</Row>
		</Container>
	);
};

export default AppLayout;
