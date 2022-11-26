import React from 'react';
import styles from './Banner.module.css';

const Banner = ({ buttonText, handleOnBannerBtnClick }) => {
	return (
		<div className={styles.comtainer}>
			<h1 className={styles.title}>
				<span className={styles.title1}>Coffee&nbsp;</span>
				<span className={styles.title2}>Connisseur</span>
			</h1>
			<p className={styles.subTitle}>Discover your local coffee shops!</p>
			<div className={styles.buttonWrapper}>
				<button className={styles.button} onClick={handleOnBannerBtnClick}>
					{buttonText}
				</button>
			</div>
		</div>
	);
};

export default Banner;
