import React, { useCallback, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { debounce } from 'lodash';
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

	const debounceHandler = useCallback(
		debounce((search: string) => {
			onChange(search);
		}, 700),
		[],
	);

	const onChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		debounceHandler(e.target.value);
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

		console.log('before clearing timeout : ', timeout);
		clearTimeout(timeout);

		timeout = setTimeout(later, wait || 0);
		console.log('after setting new timeout : ', timeout);

		if (callNow) {
			// @ts-ignore
			func.apply(this, arguments);
		}
	};
};

export default InputSearch;
