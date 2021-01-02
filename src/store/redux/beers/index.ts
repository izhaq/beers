import { AvailableBeersState } from './availableBeers/interfaces';
import { FavoritesBeersState } from './favoriteBeers/interfaces';

export interface BeerState {
	availableBeers: AvailableBeersState;
	favoriteBeers: FavoritesBeersState;
}
