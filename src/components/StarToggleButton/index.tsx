import React from 'react';
import './style.scss';

interface Props {
	onClick: any;
}

const StarToggleButton: React.FC<Props> = (props: Props) => {
	const { onClick } = props;
	return (
		<button type="button" className="toggle-container" onClick={() => onClick()}>
			<i className="material-icons">star</i>
		</button>
	);
};

export default StarToggleButton;
