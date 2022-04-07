const isDev = process.env.NODE_ENV === 'development';

const _isMock = true;
// mock只在dev生效
const isMock = isDev && _isMock;

export { isDev, isMock };
