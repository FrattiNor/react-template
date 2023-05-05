import type proxyJSON from '../../webpack/conf/proxy.json';

type ProxyJSON = typeof proxyJSON;
export type ProxyKey = keyof ProxyJSON;
type GetProxyOBJ<key extends ProxyKey> = Record<key, string>;
export type ProxyOBJ = GetProxyOBJ<ProxyKey>;
