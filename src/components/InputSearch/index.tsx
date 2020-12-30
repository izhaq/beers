import React, { useCallback, useState } from 'react';
import './style.scss';

/* eslint-disable react/jsx-props-no-spreading */

interface Props extends React.HTMLProps<HTMLInputElement>{
	onChange: any;
}

const BeerCard: React.FC<Props> = (props: Props) => {
	const { onChange } = props;
	const searchText = useUserInput('', onChange);
	return (
		<input
			placeholder="Search languages here..."
			type="text"
			id="search-input"
			{...searchText}
		/>
	);
};

export const useUserInput = (defaultValue = '', onChangeHandler: any) => {
	const [value, setValue] = useState(defaultValue);
	const onChange = useCallback((e) => {
		setValue(e.target.value);
		onChangeHandler(e.target.value.trim());
	}, []);

	return { value, onChange };
};

export default BeerCard;
