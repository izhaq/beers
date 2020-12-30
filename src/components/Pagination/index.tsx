import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

interface Props {
	children: any;
	loadMoreHandler: (page: number) => any;
}

const Pagination: React.FC<Props> = (props: Props) => {
	const { children, loadMoreHandler } = props;

	return (
		<InfiniteScroll
			pageStart={0}
			loadMore={loadMoreHandler}
			hasMore
			loader={<div className="loader" key={0}>Loading ...</div>}
			useWindow={false}
		>
			{children}
		</InfiniteScroll>
	);
};

export default Pagination;
