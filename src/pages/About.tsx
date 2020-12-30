import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { queryClient } from '../react-query.config';

export const About: React.FC = () => {
	const history = useHistory();
	const { data } = useQuery<string>('fetchAbout',
		() => new Promise<string>((r) => setTimeout(() => r('test'), 2000)));
	useEffect(
		() => { queryClient.invalidateQueries('fetchAbout'); }, [],
	);

	return (
		<>
			<h1>{data}</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
				possimus doloribus error cumque autem asperiores, ullam deserunt quidem
				omnis doloremque itaque eius eaque sint facilis unde tenetur reiciendis
				aliquam soluta?
			</p>
			<button
				type="button"
				className="btn"
				cy-data="go-back-button"
				onClick={() => history.push('/')}
			>
				Go back
			</button>

			<button
				type="button"
				className="btn"
				cy-data="go-back-button"
				onClick={() => queryClient.invalidateQueries('fetchAbout')}
			>
				Go Fuck !
			</button>
		</>
	);
};
