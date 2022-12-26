import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const DynameRoute = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.query.id}</title>
      </Head>
      <div>I am an {router.query.id}</div>;
    </>
  );
};

export default DynameRoute;
