import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './apps/**/*.{ts,tsx}', // apps Next.js
    './libs/shared/shared-ui/**/*.{ts,tsx}', // 👈 inclus la lib
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
