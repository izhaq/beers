import React, { useCallback, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './style.scss';

/* eslint-disable react/jsx-props-no-spreading */

interface Props extends React.HTMLProps<HTMLInputElement>{
	onChange: any;
}

const BeerCard: React.FC<Props> = (props: Props) => {
	const { onChange } = props;
	const searchText = useUserInput('', onChange);
	return (
		<>
			<div className="searchInput-container">
				<input
					placeholder="Search beers here..."
					type="text"
					id="search-input"
					{...searchText}
				/>
				<SearchIcon className="search-logo" fontSize="inherit" />
			</div>
		</>
	);
};

export const useUserInput = (defaultValue = '', onChangeHandler: (e: any) => void): { value: string; onChange: (e: any) => void } => {
	const [value, setValue] = useState(defaultValue);
	const onChange = useCallback((e) => {
		setValue(e.target.value);
		onChangeHandler(e.target.value.trim());
	}, []);

	return { value, onChange };
};

export default BeerCard;
