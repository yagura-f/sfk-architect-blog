import type { GetStaticProps, NextPage } from "next";
import { cmsClient } from "../../lib/api/cms-client";

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
    <div>
      <span>{blog.title}</span>
      <span>{blog.body}</span>
    </div>
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
