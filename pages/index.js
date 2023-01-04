import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
import styles from "../styles/Home.module.css";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-locations";
import { useEffect } from "react";

export default function Home({ coffeeStores }) {
  const { handleTrackLocation, latLong, errorMessage, isFindingLocation } = useTrackLocation();

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    const getCoffeeStores = async () => {
      console.log("akiraaaa")
    if (latLong) {
      try {
          console.log("akira latlong", latLong)
        const fetchedCoffeeStores = await fetchCoffeeStores(latLong);
        console.log("akira fetchedCoffeeStores", fetchedCoffeeStores)
      } catch {
        return;
      }
    }

    }
      getCoffeeStores();
  },[latLong])

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Conniseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnBannerBtnClick={handleOnBannerBtnClick}
          isFindingLocation={isFindingLocation}
        />
        {errorMessage && <p>Something went wrong: {errorMessage}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" alt="" width={700} height={400} />
        </div>
        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>San Francisco Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.id}
                    className={styles.card}
                    name={store.name}
                    href={`/coffee-store/${store.id}`}
                    imgUrl={
                      store.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
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

export const getStaticProps = async () => {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
};
