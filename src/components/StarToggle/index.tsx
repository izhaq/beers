/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import './style.scss';

interface Props {
	marked?: boolean;
	onClick?: any;
	id?: any;
}

const StarToggle: React.FC<Props> = (props: Props) => {
	const { marked = false, onClick, id } = props;
	const [selected, setSelected] = useState(marked);

	React.useEffect(() => {
		setSelected(marked);
	}, [marked]);

	const onToggle = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		event.stopPropagation();
		setSelected(!selected);
		if (onClick) {
			onClick(!selected, id);
		}
	};

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
		<span className="star" role="button" onClick={onToggle}>
			{selected ? '\u2605' : '\u2606'}
		</span>
	);
};

export default StarToggle;
