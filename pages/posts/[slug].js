/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Markup } from "interweave";
import Title from "../../components/Title";
import Button from "../../components/Button";
import FacebookLoading from "../../components/FacebookLoading";
import { useState } from "react";
import tw, { css } from "twin.macro";
import { toast } from "react-toastify";
import useInView from "react-cool-inview";
import { useSelector } from "react-redux";
// import Image from "next/image";

const CommentForm = dynamic(() => import("../../components/posts/CommentForm"));
const NewPostForm = dynamic(
  () => {
    return import("../../components/NewPostForm");
  },
  { ssr: false }
);
const Modal = dynamic(() => import("../../components/Modal"));

export default function SinglePost({
  data: {
    _id: id,
    title,
    content,
    author,
    tags,
    slug,
    thumbnail,
    description,
    category,
  },
}) {
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
  });

  const [editModal, setEditModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const toggleRemoveModal = () => {
    setRemoveModal(!removeModal);
  };
  const onPostSubmit =
    ({
      old_slug,
      content,
      title,
      tags,
      slug,
      thumbnail,
      description,
      category,
    }) =>
    (e) => {
      e.preventDefault();

      let tags = "none";

      axios
        .put("/api/posts/edit", {
          old_slug,
          content,
          title,
          tags,
          slug,
          thumbnail,
          description,
          category,
        })
        .then((res) => {
          if (!res.data.error?.message) {
            toast("Bài viết đã được sửa🤗");

            toggleEditModal();
            router.push(`/posts/${slug}`);
          } else {
            toast(`Lỗi: ${res.data.error.message}`);
          }
        });
    };

  const removePost = () => {
    axios
      .delete("/api/posts/remove", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          slug,
        },
      })
      .then((res) => {
        if (!res.data.error?.message) {
          toast.success("Bài viết đã được xóa");

          router.push("/");
        } else {
          toast.error(`Lỗi: ${res.data.error.message}`);
        }
      });
  };
  if (!title)
    return (
      <p tw="flex items-center justify-center text-lg">
        Loading... <FacebookLoading />
      </p>
    );
  return (
    <div>
      <Head>
        <title>{title} - Taytrongbantay</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main
        css={[
          css`
            animation: fadeIn 2s ease;
          `,
        ]}
      >
        <Button
          tw="mb-2 px-2 sticky top-14 bg-opacity-50"
          onClick={() => {
            window.history.back();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            tw="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        {editModal && (
          <Modal
            noSubmitButton={true}
            onCancel={{ f: toggleEditModal, text: "Đóng" }}
            title="Chỉnh sửa bài viết"
          >
            <NewPostForm
              onPostSubmit={onPostSubmit}
              initialState={{
                content,
                title,
                tags, // tag is unused now
                slug,
                thumbnail,
                description,
                category,
              }}
            ></NewPostForm>
          </Modal>
        )}

        {removeModal && (
          <Modal
            title="Xóa bài viết"
            onCancel={{ f: toggleRemoveModal, text: "Đóng" }}
            onProcess={{ f: removePost, text: "Xóa" }}
          >
            <p>
              Bạn có chắc muốn xóa bài viết, bạn không thể hoàn tác tác vụ này.
            </p>
          </Modal>
        )}
        <div tw="p-2 bg-green-100 text-center text-xl">{title}</div>
        <div tw="mb-4 p-3 pb-5 leading-7">
          <div tw="md:grid grid-cols-6 gap-4">
            <div tw="flex md:flex-col divide-y-reverse md:divide-y-2 divide-yellow-500">
              <Link href={`/profile/${author.username}`}>
                <a>
                  <img
                    tw="w-20 md:w-60 rounded shadow-md cursor-pointer"
                    alt={"Ảnh của " + author.username}
                    src={author.avatar}
                  />
                </a>
              </Link>

              <Link href={`/profile/${author.username}`}>
                <h3 tw="flex-grow md:flex-grow-0 flex cursor-pointer items-center flex-col justify-center text-center text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-red-600">
                  <a>
                    {/* <img
                      css={[
                        css`
                          margin-left: -24px;
                          margin-right: 2px;
                        `,
                      ]}
                      tw="inline-block"
                      width="24px"
                      src="/images/level/50.png"
                      alt="level 50"
                    ></img> */}
                    {author.username}
                  </a>
                </h3>
              </Link>
            </div>
            <div
              className="ck-content"
              tw="bg-white bg-opacity-80 col-span-5 p-3 mt-4 border-gray-300 shadow-md border-2 rounded"
            >
              {/* {thumbnail && (
                <>
                  <Image
                    src={thumbnail}
                    layout="responsive"
                    objectFit="contain"
                    width="100%"
                    height="60%"
                    alt="Post Thumbnail"
                  />
                  <div tw="mt-2" />
                </>
              )} */}
              {
                <Markup
                  content={content}
                  allowElements={true}
                  allowAttributes={true}
                />
              }
            </div>
          </div>
          {user?.admin === "admin" && (
            <div tw="mt-2 flex justify-end gap-1">
              <Button onClick={toggleEditModal}>Sửa</Button>
              <Button onClick={toggleRemoveModal} error>
                Xóa
              </Button>
            </div>
          )}
        </div>
        <div ref={observe}>
        {inView && (
          <>
            <Title>Bình luận</Title>
            <div id="Comment">
              <CommentForm id={id} />
            </div>
          </>
        )}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  // Fetch data from external API
  const res = await axios.get(`${process.env.baseUrl}/api/posts/${slug}`);

  const { data } = res;

  if (!data) {
    return { notFound: true };
  }

  // Pass data to the page via props
  return { props: { data } };
}
