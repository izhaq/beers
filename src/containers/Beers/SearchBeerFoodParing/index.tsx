import React, { useCallback } from 'react';
import { InputSearch } from 'components';
import { Col, Row } from 'react-bootstrap';
import './style.scss';
import { ActionTypes as actionTypes } from 'store/redux/beers/availableBeers/interfaces';
import { useDispatch } from 'react-redux';

const SearchBeerFoodParing: React.FC = () => {
	const dispatch = useDispatch();
	const onSearchQueryChange = useCallback((searchQuery: string) => (
		dispatch({ type: actionTypes.GET_BEERS, searchQuery })), []);

	return (
		<Row className="food-paring-search">
			<Col className="col-12">
				<InputSearch onChange={onSearchQueryChange} />
			</Col>
		</Row>
	);
};

export default SearchBeerFoodParing;
