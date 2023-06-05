import { getMqttProxy } from '@proxy/index';
// dev
export const isDev = process.env.NODE_ENV === 'development';
export const mqttDevUrl = `ws://${getMqttProxy()}/mqtt`;
// build
export const isWebView = true;
export const isAndroid = navigator.userAgent.indexOf('Android') > -1;
export const isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
