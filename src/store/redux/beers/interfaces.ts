export interface BaseBeer {
	id: number;
	name: string;
	description: string;
	tagline: string;
	first_brewed: string;
	food_pairing: Array<string>
}

export interface Beer extends BaseBeer{
	isFavorite: boolean;
	ranking?: Ranking;
}

export enum RankingTypes {
	ONE_START = 1,
	TWO_STAR,
	TREE_STAR,
	FOUR_STAR,
	FIVE_STAR,
}

export type Ranking = RankingTypes;
