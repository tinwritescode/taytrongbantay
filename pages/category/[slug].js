import axios from "axios";
import Head from "next/head";
import Link from "next/link";
// import Title from "../../components/Title";
import ContentWrapper from "../../components/ContentWrapper";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FacebookLoading from "../../components/FacebookLoading";
import tw, { styled } from "twin.macro";

export default function CategoryView() {
  let [category, setCategory] = useState(null);
  let [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.query.slug) {
      const { slug } = router.query;

      // Fetch category info
      axios.get(`/api/category/${slug}`).then((res) => {
        const { data } = res;
        setCategory(data[0]);
      });

      // Fetch posts info
      axios.get(`/api/posts?category=${slug}`).then((res) => {
        const { data } = res;
        console.log(data);
        setPosts(data);
      });
    }
  }, [router.query]);

  if (!category || !posts)
    return (
      <p tw="flex items-center justify-center text-lg">
        Loading... <FacebookLoading />
      </p>
    );
  return (
    <div>
      <Head>
        <title>{category?.name || "Loading..."} - Taytrongbantay</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
        <div tw="p-2 bg-green-100 text-center text-xl">{category?.name}</div>
        <ContentWrapper>
          {posts &&
            posts.map((post) => {
              return (
                <Link key={post.slug} href={`/posts/${post.slug}`}>
                  <a>
                    <div tw="divide-y divide-yellow-500">{post.title}</div>
                  </a>
                </Link>
              );
            })}
        </ContentWrapper>
      </main>
    </div>
  );
}
