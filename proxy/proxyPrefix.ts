import proxyJSON from './proxy.json';

type ProxyJSON = typeof proxyJSON;
type ProxyKey = keyof ProxyJSON;
type GetProxyOBJ<key extends ProxyKey> = Record<key, string>;
type ProxyOBJ = GetProxyOBJ<ProxyKey>;

// 获取代理前缀
const getProxyPrefix = () => {
    const obj: ProxyOBJ = {} as ProxyOBJ;
    Object.entries(proxyJSON).forEach(([k, v]) => {
        obj[k as ProxyKey] = v.prefix;
    });
    return obj;
};

const proxyPrefix = getProxyPrefix();

export default proxyPrefix;
