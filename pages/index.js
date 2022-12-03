import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/Banner/Banner';
import Card from '../components/Card/Card';
import styles from '../styles/Home.module.css';
import coffeeStores from '../data/coffee-stores.json';

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
										key={idx}
										className={styles.card}
										name={store.name}
										href={`/coffee-store/${store.name}`}
										imgUrl={store.imgUrl}
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
	return {
		props: {
			coffeeStores,
		},
	};
};
