/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import './style.scss';
import beerLogo from 'public/assets/images/beer2.svg';
import StarToggle from 'components/StarToggle';
import { Beer } from 'store/redux/beers/interfaces';
import { beerModal } from './config';

interface Props {
	beer: Beer;
	onFavoriteChange: any;
	footer?: any;
}

const BeerView: React.FC<Props> = (props: Props) => {
	const {
		beer, beer: { name, isFavorite }, onFavoriteChange, footer,
	} = props;
	const toggleFavorite = (favorite: boolean) => {
		onFavoriteChange(beer, favorite);
	};

	const [showBeerDetails, setShowBeerDetails] = useState(false);

	const openBeerDetails = beerModal(() => setShowBeerDetails(false));

	return (
		<>
			<span className="beer-container" onClick={() => setShowBeerDetails(true)}>
				<span className="favorite-toggle">
					<StarToggle marked={isFavorite} onClick={toggleFavorite} />
				</span>
				<span className="beer-logo">
					<img src={beerLogo} alt="beer" />
				</span>
				<span className="beer-name">
					<span>{name}</span>
				</span>
				{footer}
			</span>
			{openBeerDetails(showBeerDetails, beer)}
		</>
	);
};

export default BeerView;
