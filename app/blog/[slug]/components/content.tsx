"use client";

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

export function BlogContent({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} />
}