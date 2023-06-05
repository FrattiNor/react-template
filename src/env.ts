import { getMqttProxy } from '@proxy/index';
import envBuildJSON from './envBuild.json';
import packageJSON from '../package.json';
// dev
export const isDev = process.env.NODE_ENV === 'development';
export const mqttDevUrl = `ws://${getMqttProxy()}/mqtt`;
// build
export const version = packageJSON.version;
export const isWebView = envBuildJSON.isWebView;
export const isAndroid = window.navigator.userAgent.indexOf('Android') > -1;
export const isIos = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
