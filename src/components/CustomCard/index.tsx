/* eslint react/require-default-props: 0 */
import * as React from 'react';
import './style.scss';

interface Props {
	children: any;
	className?: string;
	onClick?: any;
	selected?: boolean;
}

const CustomCard: React.FC<Props> = (props: Props) => {
	const {
		children,
		onClick,
		selected = false,
		className = '',
	} = props;

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div className={`${className} card-wrapper ${selected && 'selected'} `} onClick={onClick}>
			{children}
		</div>
	);
};

export default CustomCard;
