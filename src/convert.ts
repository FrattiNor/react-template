/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-debugger */
import { btoa, atob } from './utils.js';
import { fileURLToPath } from 'url';
import { rimrafSync } from 'rimraf';
import { nanoid } from 'nanoid';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const convert = async (_oldAppId: string, _newAppId: string) => {
    const oldAppId = _oldAppId === '' ? '' : _oldAppId;
    const newAppId = _newAppId === '' ? '' : _newAppId;

    const replaceAppId = (text: string) => {
        if (oldAppId && newAppId) {
            return text.replaceAll(oldAppId, newAppId);
        }
        return text;
    };

    const exec = async (convertPath: string, outPath: string) => {
        // 清掉对应文件夹
        rimrafSync(outPath);
        const items = fs.readdirSync(convertPath);

        // 遍历
        for (let j = 0; j < items.length; j++) {
            const item = items[j];
            const itemPath = path.join(convertPath, item);
            const itemOutPath = path.join(outPath, item);

            // 是文件夹
            if (fs.statSync(itemPath).isDirectory()) {
                await exec(itemPath, itemOutPath);
            }

            // 文件
            if (fs.statSync(itemPath).isFile()) {
                if (/^Page_.+\.json$/.test(item)) {
                    // 替换文件里的appId
                    const itemStr = replaceAppId(fs.readFileSync(itemPath, 'utf-8'));
                    // 文件JSON数据【new用来变更，避免修改原数据】
                    const itemJson = JSON.parse(itemStr);
                    const newItemJson = JSON.parse(itemStr);
                    // 页面类型【1 自定义页面】【3 url】
                    const pageType = itemJson?.content?.propertyValues?.type;
                    // context内容，经过base64加密
                    const itemContext = itemJson?.children?.[0]?.content?.propertyValues?.context;

                    // 页面类型为1（空白页面）
                    if (pageType === 1) {
                        // 有页面主体
                        if (typeof itemContext === 'string') {
                            // 替换主体的appId
                            const contextText = replaceAppId(atob(itemContext));
                            // 主体JSON数据【new用来变更，避免修改原数据】
                            const contextJson = JSON.parse(JSON.parse(contextText));
                            const newContextJson = JSON.parse(JSON.parse(contextText));
                            // 主体Data数据
                            const contextData = contextJson?.context?.jsonData?.d;
                            const newContextData = newContextJson?.context?.jsonData?.d;

                            if (Array.isArray(contextData)) {
                                for (let i = 0; i < contextData.length; i++) {
                                    const contextItem = contextData[i];
                                    const newContextItem = newContextData[i];

                                    if (Object.prototype.toString.call(contextItem?.a) === '[object Object]') {
                                        const { widgetName } = contextItem?.a;
                                        const bg = contextItem?.s['shape.background'];
                                        // 存在 widget
                                        if (widgetName === 'Rect' && (bg === 'rgba(29,141,4,1)' || bg === 'rgba(106,109,105,1)')) {
                                            newContextItem.p = {
                                                ...contextItem.p,
                                                displayName: contextItem.p.displayName.replaceAll('Rect', 'CustomComp'),
                                                tag: nanoid(),
                                                image: 'htDiv',
                                            };
                                            newContextItem.a = {
                                                appDetail: {
                                                    appId: 'App_a870b0c69f5a9157a781409e15af6928',
                                                    layoutId: 'Layout_5a428c5814e540fd9731b0aa8fbf44eb',
                                                },
                                                widgetName: 'CustomComp',
                                                componentName: 'AreaComponent',
                                                resource: {
                                                    sourcePath: '/resource/App_a870b0c69f5a9157a781409e15af6928/extensions/AreaComponent/source/index.js',
                                                    compiledPath: '/resource/App_a870b0c69f5a9157a781409e15af6928/extensions/AreaComponent/compiled/index.js',
                                                    propsConfigPath: '/resource/App_a870b0c69f5a9157a781409e15af6928/extensions/AreaComponent/index.json',
                                                    dependenciesPath: '/resource/App_a870b0c69f5a9157a781409e15af6928/extensions/AreaComponent/dependencies.json',
                                                },
                                                isPreviewInDesign: true,
                                                dataReplace: null,
                                            };
                                            delete newContextItem.s;
                                        }

                                        if (widgetName === 'Text') {
                                            const text = contextItem?.a?.['tb.content'];
                                            const size = contextItem?.a?.['tb.fontSize'];
                                            if (i > 0) {
                                                const beforeContextItem = contextData[i - 1];
                                                const beforeNewContextItem = newContextData[i - 1];
                                                const { widgetName } = beforeContextItem?.a;
                                                const bg = beforeContextItem?.s['shape.background'];
                                                if (widgetName === 'Rect' && (bg === 'rgba(29,141,4,1)' || bg === 'rgba(106,109,105,1)')) {
                                                    beforeNewContextItem.a = {
                                                        ...beforeNewContextItem.a,
                                                        data: { 'area-name': text, 'area-fontSize': size },
                                                    };
                                                    newContextData[i] = null;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            newContextJson.context.jsonData.d = newContextJson?.context?.jsonData?.d.filter((item: any) => !!item);
                            const newContextText = btoa(JSON.stringify(JSON.stringify(newContextJson)));
                            newItemJson.children[0].content.propertyValues.context = newContextText;
                        }
                    }
                    if (!fs.existsSync(outPath)) fs.mkdirSync(outPath, { recursive: true });
                    fs.writeFileSync(itemOutPath, JSON.stringify(newItemJson));
                } else {
                    if (!fs.existsSync(outPath)) fs.mkdirSync(outPath, { recursive: true });
                    fs.writeFileSync(itemOutPath, fs.readFileSync(itemPath, 'utf-8'));
                }
            }
        }
    };

    const convertPath = path.join(__dirname, './BeforeConversion');
    const outPath = path.join(__dirname, './AfterConversion');
    const otherData = path.join(__dirname, './OtherData');

    if (!fs.existsSync(convertPath)) {
        console.log('不存在文件夹', convertPath);
        return;
    }

    console.log('开始转换...');

    await exec(convertPath, outPath);

    // 保存数据
    if (!fs.existsSync(otherData)) fs.mkdirSync(otherData, { recursive: true });

    console.log('转换完成...');

    debugger;
};

export default convert;
