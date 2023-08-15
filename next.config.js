/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		PS_API_URL: process.env.PS_API_URL,
		PS_API_TOKEN: process.env.PS_API_TOKEN,
		API_URL: process.env.API_URL,
		API_TOKEN: process.env.API_TOKEN,
	},
};

module.exports = nextConfig;
