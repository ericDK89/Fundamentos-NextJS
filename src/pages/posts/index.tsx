import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import styles from "./styles.module.scss";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Post | Ignews</title>
      </Head>

      <main className={styles.Container}>
        <div className={styles.Content}>
          {/* {posts.map((post) => (
            <a key={post.slug} href="#">
              <time> {post.updatedAt} </time>
              <strong> {post.title} </strong>
              <p> {post.excerpt} </p>
            </a>
          ))} */}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const res = await prismic.query<any>(
    [Prismic.predicates.at("document.type", "myPostId")],
    {
      fetch: ["myPostId.title", "myPostId.content"],
      pageSize: 100,
    }
  );

  // const posts = res.results.map((post) => {
  //   return {
  //     slug: post.uid,
  //     title: RichText.asText(post.data.title),
  //     excerpt:
  //       post.data.content.find((content) => content.type === "paragraph")
  //         ?.text ?? "",
  //     updatedAt: new Date(post.last_publication_date).toLocaleDateString(
  //       "pt-BR",
  //       {
  //         day: "2-digit",
  //         month: "long",
  //         year: "numeric",
  //       }
  //     ),
  //   };
  // });

  console.log(JSON.stringify(res, null, 2));

  return {
    props: {},
  };
};
