import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolink from "rehype-autolink-headings";

export function MDX({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypeSlug], [rehypeAutolink, { behavior: "wrap" }]],
        },
      }}
      components={{
        // add custom MDX components here if you want (Callout, ImageWithCaption, etc.)
      }}
    />
  );
}
