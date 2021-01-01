import React, { useState } from 'react';
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

	const onKeyup = () => {
		const { onChange } = props;
		const debounceCallback = handleDebounce(() => {
			onChange(value);
		}, 700);
		debounceCallback();
	};

	const onChangeValue = (e: any) => {
		setValue(e.target.value);
	};

	return (
		<>
			<div className="searchInput-container">
				<input
					placeholder="Search beers here..."
					type="text"
					id="search-input"
					value={value}
					onKeyUp={() => onKeyup()}
					onChange={onChangeValue}
				/>
				<SearchIcon className="search-logo" fontSize="inherit" />
			</div>
		</>
	);
};

export const handleDebounce = (func: any, wait: number, immediate?: boolean) => {
	let timeout: any;

	return () => {
		const later = () => {
			timeout = null;

			if (!immediate) {
				// @ts-ignore
				func.apply(this, arguments);
			}
		};

		const callNow = immediate && !timeout;

		clearTimeout(timeout);

		timeout = setTimeout(later, wait || 0);

		if (callNow) {
			// @ts-ignore
			func.apply(this, arguments);
		}
	};
};

export default InputSearch;
