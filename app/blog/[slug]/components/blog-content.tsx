
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";


export function BlogContent({ content }: { content: string }) {
    return (
        <MDXRemote source={content}
            options={{
                mdxOptions: {
                    rehypePlugins: [
                        [
                            rehypePrettyCode,
                            {
                                keepBackground: false,
                                theme: 'github-light',
                            },
                        ],
                    ],
                },
            }}
        />
    );
}