import { Beer } from '../../redux/beers/interfaces';

export const arraysToMap = <T>(key = 'id', ...data: Array<Array<T>>): Map<any, T> => {
	const map = new Map<any, T>();
	for (const arr of data) {
		for (const elm of arr) {
			map.set(elm[key], elm);
		}
	}
	return map;
};

export const mergeArrays = <T>(key = 'id', source: Array<T>, target: Array<T>): Array<T> => {
	const map = new Map<any, T>();
	for (const elm of source) {
		map.set(elm[key], elm);
	}

	for (const elm of target) {
		if (map.has(elm[key])) {
			map.set(elm[key], elm);
		}
	}
	return Array.from(map.values());
};

export const resetBeerData = (page: number, searchQuery: string, newBeers: Array<Beer> = []): boolean => {
	return page === 1 && (searchQuery === '' || newBeers.length === 0);
};
