const dev = 'http://localhost:3000';
const pro = 'http://8.131.61.150:5000';
export const TIMEOUT = 5000;
export const BASE_URL = process.env.NODE_ENV === 'development' ? dev : pro;
