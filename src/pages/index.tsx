import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "./index.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.Container}>
        <section className={styles.Content}>
          <strong>👏 Hey, Welcome</strong>
          <h1>
            News about <br /> the <span>React</span> world
          </h1>
          <p>
            Get access to all the publications <br />{" "}
            <strong>for {product.amount} month</strong>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/assets/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1Kxg5AK2xYyqjsOttK6089MF");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24 * 30, //1 month
  };
};
