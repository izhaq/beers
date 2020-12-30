import React from 'react';
import { Beer } from '../../store/redux/beers/interfaces';
import './style.scss';
import beerLogo from '../../public/assets/images/beer2.svg';
import StarToggleButton from '../StarToggleButton';

interface Props {
	beer: Beer;
	onClick: any;
}

const BeerCard: React.FC<Props> = (props: Props) => {
	const { beer: { name }, onClick } = props;
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className="beer-card card hoverable" onClick={() => onClick()}>
			<div className="favorite-toggle">
				<StarToggleButton onClick={() => {}} />
			</div>
			<div className="card-image">
				<img src={beerLogo} alt="beer" />
			</div>
			<div className="card-header">
				<span>{name}</span>
			</div>
		</div>
	);
};

export default BeerCard;
