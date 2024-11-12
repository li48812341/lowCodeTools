/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/', // 当访问根路径 `/`
            destination: '/test', // 自动重定向到 `/login`
            permanent: true, // 设置为永久重定向 (301)，如果是临时重定向可以设为 false
          },
        ];
      }
};
// import '@/styles/globals.css';  // 确保 Tailwind CSS 样式被引入

export default nextConfig;
