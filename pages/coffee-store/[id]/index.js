import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import coffeestores from '../../../data/coffee-stores.json';

export const CoffeStore = ({ coffeeStore }) => {
	const router = useRouter().query.id;
	return (
		<div>
			Coffee Store Page {router}
			<Link href={'/'}>Back to Home</Link>
			<Link href='/coffee-store/dynamic'>Go to Dynamic Page</Link>
			<p>{coffeeStore.address}</p>
			<p>{coffeeStore.name}</p>
		</div>
	);
};

export const getStaticPaths = async (context) => {
	return {
		paths: [{ params: { id: '0' } }, { params: { id: '1' } }],
		fallback: false,
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
