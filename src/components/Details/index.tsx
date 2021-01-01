import React from 'react';
import './style.scss';
import { Col, Row } from 'react-bootstrap';

export enum DetailTypes {
	STRING = 'STRING',
	ARRAY = 'ARRAY',
}

export interface Detail<K = any> {
	label: string;
	key: keyof K;
	type?: DetailTypes;
}

export interface DetailsConfig<T = any>{
	details: Array<Detail<T>>;
	data: T;
}

interface Props{
	config: DetailsConfig;
}

const Details: React.FC<Props> = (props: Props) => {
	const { config: { data, details } } = props;
	const getValue = (detail: Detail) => ((detail.type === DetailTypes.ARRAY) ? data[detail.key].join(', ') : data[detail.key]);

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<div className="details-container">
			{
				details.map((detail) => (
					<Row key={detail.label} className="row mt-2">
						<Col>
							<strong className="col-auto">{detail.label}</strong>
							<div className="col-auto">{getValue(detail)}</div>
						</Col>
					</Row>
				))
			}
		</div>
	);
};

export default Details;
