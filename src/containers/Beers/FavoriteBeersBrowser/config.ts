import { Beer } from 'store/redux/beers/interfaces';

export type Checked = {
	[key: number]: boolean
};

export const mapBeersToChecked = (beers: Array<Beer>, checked: boolean) => beers.reduce((acc, beer) => ({ ...acc, [beer.id]: checked }), {});

export const mapObjectToArray = (objectToMap: any, keyName: string, valueName: string, filter: (value: any) => boolean) => {
	const arr = [];
	for (const [key, value] of Object.entries(objectToMap)) {
		if (filter(value)) {
			arr.push({ [keyName]: Number(key), [valueName]: value });
		}
	}
	return arr;
};
