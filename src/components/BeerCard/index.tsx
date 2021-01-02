import React from 'react';
import './style.scss';
import beerLogo from 'public/assets/images/beer2.svg';
import StarToggle from 'components/StarToggle';
import { Beer } from 'store/redux/beers/interfaces';

interface Props {
	beer: Beer;
	onFavoriteChange: any;
}

const BeerCard: React.FC<Props> = (props: Props) => {
	const { beer, beer: { name }, onFavoriteChange } = props;
	const toggleFavorite = (favorite: boolean) => {
		onFavoriteChange(beer, favorite);
	};

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<span className="beer-container">
			<span className="favorite-toggle">
				<StarToggle marked={false} onClick={toggleFavorite} />
			</span>
			<span className="beer-logo">
				<img src={beerLogo} alt="beer" />
			</span>
			<span className="beer-name">
				<span>{name}</span>
			</span>
		</span>
	);
};

export default BeerCard;
