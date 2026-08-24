import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}','./src/**/*.{ts,tsx}'], theme: { extend: { colors: { ink:'#172033', brand:'#2563eb' } } }, plugins: [] };
export default config;
