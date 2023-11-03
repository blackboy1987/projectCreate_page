let url = 'http://localhost:8001/';
const isDev = process.env.NODE_ENV === 'development';
if (!isDev) {
  url = '/';
}
export const Constants = {
  apiUrl: `${url}`,
};
