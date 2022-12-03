import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import coffeestores from '../../../data/coffee-stores.json';
import Head from 'next/head';
import styles from './CoffeeStore.module.css';
import Image from 'next/image';
import cls from 'classnames';

export const CoffeStore = ({ coffeeStore }) => {
	const router = useRouter();

	if (router.isFallback) {
		console.log('akira loading');
		return <div>Loading....</div>;
	}

	const handleUpvoteButton = () => {
		console.log('handle upvote');
	};

	const { address, name, neighbourhood, imgUrl } = coffeeStore;
	return (
		<div className={styles.layout}>
			<Head>
				<title>{name}</title>
			</Head>

			<div className={styles.container}>
				<div className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href={'/'}>Back to Home</Link>
					</div>
					<div className={styles.nameWrapper}>
						<p className={styles.name}>{name}</p>
					</div>
					<Image src={imgUrl} width={600} height={360} alt={name} />
				</div>

				<div className={cls('glass', styles.col2)}>
					<div className={styles.iconWwrapper}>
						<Image src='/static/icons/places.svg' width={'24'} height={'24'} />
						<p className={styles.text}>{address}</p>
					</div>
					<div className={styles.iconWwrapper}>
						<Image src='/static/icons/nearMe.svg' width={'24'} height={'24'} />
						<p className={styles.text}>{neighbourhood}</p>
					</div>
					<div className={styles.iconWwrapper}>
						<Image src='/static/icons/star.svg' width={'24'} height={'24'} />
						<p className={styles.text}>{1}</p>
					</div>

					<button className={styles.upvoteButton} onClick={handleUpvoteButton}>
						Up Vote!
					</button>
				</div>
			</div>
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
