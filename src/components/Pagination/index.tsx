/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

export type AdditionalProps = {
	[key: string]: any
};

interface Props{
	children: any;
	loadMoreHandler: (page: number) => any;
	// eslint-disable-next-line react/require-default-props
	additionalProps?: AdditionalProps;
}

const Pagination: React.FC<Props> = (props: Props) => {
	const { children, loadMoreHandler, additionalProps = {} } = props;

	return (
		<InfiniteScroll
			pageStart={0}
			loadMore={loadMoreHandler}
			hasMore
			loader={<div className="loader" key={0}>Loading ...</div>}
			useWindow
			{...additionalProps}
		>
			{children}
		</InfiniteScroll>
	);
};

export default Pagination;
