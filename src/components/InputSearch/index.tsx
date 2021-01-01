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
	const { onChange } = props;
	const { value, onChange: onChangeHandler } = useUserInput('', onChange);
	return (
		<>
			<div className="searchInput-container">
				<input
					placeholder="Search beers here..."
					type="text"
					id="search-input"
					value={value}
					onChange={(event) => onChangeHandler(event)}
				/>
				<SearchIcon className="search-logo" fontSize="inherit" />
			</div>
		</>
	);
};

const handleDebounce = (func: any, wait: number, immediate?: boolean) => {
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

export const useUserInput = (defaultValue = '', onChangeHandler: (e: any) => void): { value: string; onChange: (e: any) => void } => {
	const [value, setValue] = useState(defaultValue);
	const onChange = (event: any) => {
		const debounceCallback = handleDebounce(() => {
			setValue(event.target.value);
			onChangeHandler(event.target.value.trim());
		}, 500);
		debounceCallback();
	};
	return { value, onChange };
};

export default InputSearch;
