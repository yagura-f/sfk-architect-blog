import type { GetStaticProps, NextPage } from "next";
import { cmsClient } from "../../lib/api/cms-client";
import styles from "../../styles/Home.module.css";

type Blog = {
  id: string;
  title: string;
  body: string;
};

type Props = {
  blog: Blog;
};

const BlogId: NextPage<Props> = (props) => {
  const { blog } = props;
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
    </main>
  );
};

export default BlogId;

export const getStaticPaths = async () => {
  const res = await cmsClient.getList({ endpoint: "blog" });
  const paths = res.contents.map((blog) => `/blog/${blog.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  props
) => {
  const { id } = props.params!;
  const res = await cmsClient.getListDetail<Blog>({
    endpoint: "blog",
    contentId: id,
  });
  return {
    props: { blog: res },
  };
};
