import RoutesPath from '../../routes/RoutesPath';

interface NavConfig{
	to: string;
	label: string;
}

export const navbarLinks: Array<NavConfig> = [
	{ to: RoutesPath.ROOT, label: 'Browse Beers' },
	{ to: RoutesPath.FAVORITE_BEERS, label: 'Favorites' },
];
