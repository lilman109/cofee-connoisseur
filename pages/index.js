import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/Banner/Banner';
import styles from '../styles/Home.module.css';

export default function Home() {
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
			</main>
		</div>
	);
}
