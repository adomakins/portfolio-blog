/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'prod-files-secure.*.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    }
};

export default nextConfig;