import React from 'react';
import './style.scss';

export interface Detail {
	label: string;
	value: any;
}

interface Props {
	data: Array<Detail>;
}

const Details: React.FC<Props> = (props: Props) => {
	const { data } = props;
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<div className="details-container">
			{
				data.map((detail) => (
					<div key={detail.label} className="row">
						<strong className="col-auto">{detail.label}</strong>
						<div className="col-auto">{detail.value}</div>
					</div>
				))
			}
		</div>
	);
};

export default Details;
