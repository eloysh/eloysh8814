/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Не запускаем ESLint на Vercel-быилде
    ignoreDuringBuilds: true,
  },
  // типы НЕ игнорируем — мы их сейчас починим
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
