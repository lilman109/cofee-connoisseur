import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "./CoffeeStore.module.css";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../../lib/coffee-stores";

export const CoffeStore = ({ coffeeStore }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading....</div>;
  }

  const handleUpvoteButton = () => {
    console.log("handle upvote");
  };

  const { name, neighborhood, imgUrl, address } = coffeeStore;
  console.log("foo neighborhood", neighborhood);
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href={"/"}>← Back to Home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{name}</p>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width={"24"} height={"24"} alt="" />
            <p className={styles.text}>{address}</p>
          </div>
          {neighborhood && neighborhood.length > 0 && (
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/nearMe.svg" width={"24"} height={"24"} alt="" />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width={"24"} height={"24"} alt="" />
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

export const getStaticPaths = async () => {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((store) => {
    return {
      params: {
        id: store.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const coffeeStores = await fetchCoffeeStores();
  console.log("foo coffee stores", coffeeStores);
  return {
    props: {
      coffeeStore: coffeeStores.find((store) => {
        return store.id.toString() === params.id;
      }),
    },
  };
};

export default CoffeStore;
