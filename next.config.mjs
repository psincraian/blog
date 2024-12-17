import createMDX from '@next/mdx'
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import readingTime from "remark-reading-time";
import readingMdxTime from "remark-reading-time/mdx.js";
import remarkGfm from "remark-gfm";
import {setupDevPlatform} from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      readingTime,
      readingMdxTime,
    ],
    rehypePlugins: [
      [
        rehypePrettyCode, {
          theme: "github-light",
        }]],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig)