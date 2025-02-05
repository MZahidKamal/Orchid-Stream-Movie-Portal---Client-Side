const BASE_URL = import.meta.env.VITE_node_environment === 'production' ? 'https://orchid-movie-portal-server-side.vercel.app' : 'http://localhost:3000';

console.log(`Current BASE_URL: ${BASE_URL}`)

export default BASE_URL;
