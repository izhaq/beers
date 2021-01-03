/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus,jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import './style.scss';
import { v4 as uniqueId } from 'uuid';
import StarToggle from '../StarToggle';

interface Rank {
	id: number;
	value: boolean;
}

interface Props{
	rank?: number;
	onClick?: any;
	id?: any;
}

const ranks = [1, 2, 3, 4, 5];

const Ranking: React.FC<Props> = (props: Props) => {
	const {
		rank = 0, onClick, id,
	} = props;
	const [ratingGroup, setRatingGroup] = useState<Array<Rank>>(
		ranks.map((rankValue) => (rankValue <= rank ? { id: rankValue, value: true } : { id: rankValue, value: false })),
	);

	React.useEffect(() => {
		setRatingGroup(ranks.map((rankValue) => (rankValue <= rank ? { id: rankValue, value: true } : { id: rankValue, value: false })));
	}, [rank]);

	const onChangeRating = (marked: boolean, rankId: number) => {
		const newRanking = ratingGroup.map((rankItem) => {
			return rankItem.id <= rankId ? { ...rankItem, value: marked } : { ...rankItem, value: false };
		});
		setRatingGroup(newRanking);
		if (onClick) {
			onClick(id, rankId);
		}
	};

	return (
		<span className="ranking-container" onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => e.stopPropagation()}>
			{
				ratingGroup.map((rankItem) => (
					<StarToggle key={uniqueId()} marked={rankItem.value} id={rankItem.id} onClick={onChangeRating} />
				))
			}
		</span>
	);
};

export default Ranking;
