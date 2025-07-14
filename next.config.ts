import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { withNextDevtools } from '@next-devtools/core/plugin'

const nextConfig: NextConfig = {
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
