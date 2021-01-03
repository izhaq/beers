/* eslint-disable react/require-default-props */
import React, { useCallback } from 'react';
import { InputSearch } from 'components';
import { Col, Container, Row } from 'react-bootstrap';
import './style.scss';
import { ActionTypes as actionTypes } from 'store/redux/beers/availableBeers/interfaces';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

interface Props {
	onSearchHandler?: (search: string) => void
}

const SearchBeerFoodParing: React.FC<Props> = (props: Props) => {
	const { onSearchHandler } = props;

	const dispatch = useDispatch();

	const onSearch = useCallback(
		debounce((searchQuery: string) => {
			if (onSearchHandler) {
				onSearchHandler(searchQuery);
			}
			dispatch({ type: actionTypes.GET_BEERS, searchQuery });
		}, 500),
		[],
	);

	return (
		<Container>
			<Row className="food-paring-search">
				<Col className="col-12">
					<InputSearch onChange={onSearch} />
				</Col>
			</Row>
		</Container>
	);
};

export default SearchBeerFoodParing;
