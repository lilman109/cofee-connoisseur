import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import coffeestores from '../../../data/coffee-stores.json';
import Head from 'next/head';

export const CoffeStore = ({ coffeeStore }) => {
	const router = useRouter();

	if (router.isFallback) {
		console.log('akira loading');
		return <div>Loading....</div>;
	}

	const { address, name, neighbourhood } = coffeeStore;
	return (
		<div>
			<Head>
				<title>{name}</title>
			</Head>
			<Link href={'/'}>Back to Home</Link>
			<p>{address}</p>
			<p>{name}</p>
			<p>{neighbourhood}</p>
		</div>
	);
};

export const getStaticPaths = async (context) => {
	const paths = coffeestores.map((store) => {
		return {
			params: {
				id: store.id.toString(),
			},
		};
	});
	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({ params }) => {
	return {
		props: {
			coffeeStore: coffeestores.find((store) => {
				return store.id.toString() === params.id;
			}),
		},
	};
};

export default CoffeStore;
