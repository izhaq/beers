import { call } from './base-api';

export const createApi = (baseURL = 'https://api.punkapi.com/v2/') => ({
	getBeers: (page: number, pageSize: number) => call({
		baseURL,
		method: 'get',
		url: `/beers?page=${page}&per_page=${pageSize}`,
	}),
});

export default createApi();
