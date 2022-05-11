import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";

import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Post Ignews</title>
      </Head>

      <main className={styles.Container}>
        <div className={styles.Content}>
          <a href="#">
            <time>12 março de 2022</time>
            <strong>Creating a monorepo with lerna e yarn workspace</strong>
            <p>
              In this guide you will lear n hot to acerat a monorepoo to mang e
              mukltiple packagest weith a shared as
            </p>
          </a>
          <a href="#">
            <time>12 março de 2022</time>
            <strong>Creating a monorepo with lerna e yarn workspace</strong>
            <p>
              In this guide you will lear n hot to acerat a monorepoo to mang e
              mukltiple packagest weith a shared as
            </p>
          </a>
          <a href="#">
            <time>12 março de 2022</time>
            <strong>Creating a monorepo with lerna e yarn workspace</strong>
            <p>
              In this guide you will lear n hot to acerat a monorepoo to mang e
              mukltiple packagest weith a shared as
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const res = await prismic.query([
    Prismic.predicate.at("document.type", "myPostId"),
    { fetch: ["myPostId.title", "myPostId.content"], pageSize: 100 },
  ]);

  console.log(res);

  return {
    props: {},
  };
};
