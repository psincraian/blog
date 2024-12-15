import createMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        rehypePrettyCode, 
        {
          keepBackground: false,
          theme: 'github-light',
        }
      ],

    ],
  },
});
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig);
