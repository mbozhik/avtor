import type {NextConfig} from 'next'
import {withPayload} from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  images: {
    qualities: [70, 100],
  },
  experimental: {
    reactCompiler: false,
  },
}

export default withPayload(nextConfig)
