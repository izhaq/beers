import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const call = async (config: AxiosRequestConfig) => {
	let response: AxiosResponse;
	try {
		response = await axios(config);
		return response;
	} catch (e) {
		const error = e.response || {};
		console.log(error);
		throw new Error(e);
	}
};
