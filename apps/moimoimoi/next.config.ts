
import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  transpilePackages: ['@oxymammoth/ui', '@oxymammoth/crypto'],
  experimental: { esmExternals: true }
}

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);