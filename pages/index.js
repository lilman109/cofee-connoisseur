import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/Banner/Banner';
import Card from '../components/Card/Card';
import styles from '../styles/Home.module.css';
import coffeeStores from '../data/coffee-stores.json';
import axios from 'axios';

export default function Home({ coffeeStores }) {
	const handleOnBannerBtnClick = () => {
		console.log('akira banner button clicked');
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Conniseur</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<Banner
					buttonText={'View stores nearby'}
					handleOnBannerBtnClick={handleOnBannerBtnClick}
				/>
				<div className={styles.heroImage}>
					<Image src='/static/hero-image.png' alt='' width={700} height={400} />
				</div>
				{coffeeStores.length > 0 && (
					<>
						<h2 className={styles.heading2}>Toronto Stores</h2>
						<div className={styles.cardLayout}>
							{coffeeStores.map((store, idx) => {
								return (
									<Card
										key={store.fsq_id}
										className={styles.card}
										name={store.name}
										href={`/coffee-store/${store.fsq_id}`}
										imgUrl={
											store.imgUrl ||
											'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
										}
									/>
								);
							})}
						</div>
					</>
				)}
			</main>
		</div>
	);
}

export const getStaticProps = async (context) => {
	const res = await axios.get(
		'https://api.foursquare.com/v3/places/search?query=coffee&ll=35.57%2C139.56&limit=6',
		{
			headers: {
				Authorization: process.env.FOURSQUARE_API_KEY,
			},
		}
	);

	const data = res.data;

	return {
		props: {
			coffeeStores: data.results,
		},
	};
};
