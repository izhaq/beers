/* eslint-disable react/jsx-props-no-spreading */
/* eslint camelcase: 0 */
/* eslint no-return-assign: 0 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/require-default-props */

import React, { useCallback, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './style.scss';

interface Props extends React.HTMLProps<HTMLInputElement>{
	onChange: any;
	initialValue?: string;
}

const InputSearch: React.FC<Props> = (props: Props) => {
	const { onChange, initialValue, ...rest } = props;

	const [value, setValue] = useState(initialValue);

	const onChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		if (onChange) {
			onChange(e.target.value);
		}
	}, []);

	return (
		<>
			<div className="searchInput-container">
				<input
					placeholder="Search ..."
					type="text"
					id="search-input"
					value={value}
					onChange={onChangeValue}
					{...rest}
				/>
				<SearchIcon className="search-logo" fontSize="inherit" />
			</div>
		</>
	);
};

export default InputSearch;
