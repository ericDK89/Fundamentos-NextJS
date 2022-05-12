import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";
import styles from "../post.module.scss";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title> {post.title} | Ignews </title>
      </Head>

      <main className={styles.Container}>
        <article className={styles.post}>
          <h1> {post.title} </h1>
          <time> {post.updatedAt} </time>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className={`${styles.Content} ${styles.previewContent}`}
          ></div>
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { slug: "prisma-uma-das-melhores-coisas-que-ja-aconteceu-no" },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const res = await prismic.getByUID<any>("post", String(slug), {});

  const post = {
    slug,
    title: res.data.title,
    content: RichText.asHtml(res.data.content.splice(0, 3)),
    updatedAt: new Date(res.last_publication_date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };

  return {
    props: { post },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
