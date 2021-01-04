/* eslint-disable react/require-default-props */
import React, { useCallback } from 'react';
import { InputSearch } from 'components';
import { Col, Container, Row } from 'react-bootstrap';
import './style.scss';
import { ActionTypes as actionTypes } from 'store/redux/beers/availableBeers/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { availableBeersSelector } from 'store/redux/beers/availableBeers';

interface Props {
	onSearchHandler?: (search: string) => void
}

const SearchBeerFoodParing: React.FC<Props> = (props: Props) => {
	const { onSearchHandler } = props;

	const { searchQuery: initialQuery } = useSelector(availableBeersSelector.beers);

	const dispatch = useDispatch();

	const onSearch = useCallback(
		debounce((searchQuery: string) => {
			if (onSearchHandler) {
				onSearchHandler(searchQuery);
			}
			dispatch({ type: actionTypes.GET_BEERS_BY_QUERY, searchQuery });
		}, 500),
		[],
	);

	return (
		<Container>
			<Row className="food-paring-search">
				<Col className="col-12">
					<InputSearch onChange={onSearch} initialValue={initialQuery} />
				</Col>
			</Row>
		</Container>
	);
};

export default SearchBeerFoodParing;
