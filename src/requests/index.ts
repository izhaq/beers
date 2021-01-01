import { call } from './base-api';

export const createApi = (baseURL = 'https://api.punkapi.com/v2/') => ({
	getBeers: (page: number, pageSize: number, optionalQuery = '') => call({
		baseURL,
		method: 'get',
		url: `/beers?page=${page}&per_page=${pageSize}${optionalQuery}`,
	}),
});

export default createApi();
