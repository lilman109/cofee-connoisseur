import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "./CoffeeStore.module.css";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../../lib/coffee-stores";
import { StoreContext } from "../../../context/store-context";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "../../../utils";

export const CoffeStore = (initialProps) => {
  const router = useRouter();
  const id = router.query.id;
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (initialProps.coffeeStore.length > 0) {
      const found = coffeeStores.find((store) => {
        return store.id.toString() === id;
      });

      if (found) {
        setCoffeeStore(found);
        handleCreateCoffeeStore(found);
      }
    } else {
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps, initialProps.coffeeStore]);

  const { name, neighborhood, imgUrl, address } = coffeeStore;
  const [votingCount, setVotingCount] = useState(0);

  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      setCoffeeStore(data[0]);
      setVotingCount(data[0].votes);
    }
  }, [data]);

  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const res = await axios.post(`/api/createCoffeeStore`, {
        id,
        neighborhood: neighborhood || "",
        address: address || "",
        votes: 0,
        ...coffeeStore,
      });

      const dbCoffeeStore = res.data;
      console.log("db coffee store", dbCoffeeStore);
    } catch (error) {
      console.log("Error creating coffee store", error);
    }
  };

  const handleUpvoteButton = async () => {
    console.log("handle upvote");
    try {
      const res = await axios.put(`/api/upvotingCoffeeStoreById`, {
        id,
      });

      const dbCoffeeStore = res.data;
      if (dbCoffeeStore && dbCoffeeStore.length > 0) {
        setVotingCount((prevState) => prevState + 1);
      }
    } catch (error) {
      console.log("Error upvoting coffee store", error);
    }
  };

  if (router.isFallback) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Something went wrong retrieving coffee store page</div>;
  }

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
            <p className={styles.text}>{votingCount}</p>
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
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const coffeeStores = await fetchCoffeeStores();
  console.log("foo coffee stores", coffeeStores);
  const found = coffeeStores.find((store) => {
    return store.id.toString() === params.id;
  });

  return {
    props: {
      coffeeStore: found ? found : {},
    },
  };
};

export default CoffeStore;
