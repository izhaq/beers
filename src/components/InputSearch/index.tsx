import React, { useCallback, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './style.scss';

/* eslint-disable react/jsx-props-no-spreading */
/* eslint camelcase: 0 */
/* eslint no-return-assign: 0 */
/* eslint-disable @typescript-eslint/ban-ts-comment */

interface Props extends React.HTMLProps<HTMLInputElement>{
	onChange: any;
}

const InputSearch: React.FC<Props> = (props: Props) => {
	const [value, setValue] = useState('');
	const { onChange } = props;

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
				/>
				<SearchIcon className="search-logo" fontSize="inherit" />
			</div>
		</>
	);
};

export default InputSearch;
