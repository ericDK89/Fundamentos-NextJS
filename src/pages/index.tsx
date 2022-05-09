import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";

import styles from "./index.module.scss";

export default function Home() {
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
            <strong>for $9,90 month</strong>
          </p>
          <SubscribeButton />
        </section>
        <img src="/assets/images/avatar.svg" alt="Girl coding" />
      </main>

    </>
  );
}
