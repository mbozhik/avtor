import type {NextConfig} from 'next'
import {withPayload} from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
    typedEnv: true,
    browserDebugInfoInTerminal: true,
  },
  images: {
    qualities: [70, 100],
  },
}

export default withPayload(nextConfig)
