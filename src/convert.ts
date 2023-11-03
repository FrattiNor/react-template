/* eslint-disable no-debugger */
import { AreaDeviceMap, getImageMap } from './map.js';
import { btoa, atob } from './utils.js';
import { fileURLToPath } from 'url';
import { rimrafSync } from 'rimraf';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const convert = (_oldAppId: string, _newAppId: string) => {
    const oldAppId = _oldAppId === '' ? 'App_754c6dd07fc7c8ad670166bb71b68517' : _oldAppId;
    const newAppId = _newAppId === '' ? 'App_1af1a690b81b7cabc2f5fde0b00d15ad' : _newAppId;
    const ImageMap = getImageMap(newAppId);
    const replaceAppId = (text: string) => {
        return text.replaceAll(oldAppId, newAppId);
    };

    const videoObj: Array<any> = [];
    const allBgImage: Array<any> = [];
    const allDataKey: Record<string, true> = {};
    const allDataValue: Record<string, Record<string, true>> = {};

    const exec = (convertPath: string, outPath: string) => {
        // 清掉对应文件夹
        rimrafSync(outPath);

        // 遍历
        fs.readdirSync(convertPath).forEach((item) => {
            const itemPath = path.join(convertPath, item);
            const itemOutPath = path.join(outPath, item);

            // 是文件夹
            if (fs.statSync(itemPath).isDirectory()) {
                exec(itemPath, itemOutPath);
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

                    // 页面使用了背景图片，先统计内容
                    const pageLayout = itemJson?.content?.propertyValues?.layout;
                    const bgImage = /"bgImage":"\/resource\/.+\/(.+?)",/.exec(pageLayout)?.[1];
                    if (bgImage) allBgImage.push(bgImage); // 统计bgImage

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
                                contextData.forEach((contextItem, i) => {
                                    const contextItemValue = contextItem?.a;
                                    const newContextItem = newContextData[i];
                                    const newContextItemValue = newContextItem?.a;

                                    if (Object.prototype.toString.call(contextItemValue) === '[object Object]') {
                                        const { widgetName, componentName, data } = contextItemValue;
                                        // 存在 widget
                                        if (typeof widgetName === 'string') {
                                            //  widget是自定义组件 并且 存在组件名称
                                            if (widgetName === 'CustomComp' && typeof componentName === 'string') {
                                                // 背景图自定义组件直接替换为图片组件
                                                if (ImageMap[componentName]) {
                                                    newContextItem.a = {
                                                        widgetName: 'image',
                                                    };
                                                    newContextItem.p = {
                                                        ...newContextItem.p,
                                                        image: ImageMap[componentName],
                                                    };
                                                    newContextItem.s = {
                                                        image: ImageMap[componentName],
                                                    };
                                                } else {
                                                    let replaceComponent = AreaDeviceMap[componentName];

                                                    // 根据data判断替换组件
                                                    if (replaceComponent === 'AreaOrDeviceOrVideo') {
                                                        if (data?.equipmentId) {
                                                            replaceComponent = 'DeviceComponentV2';
                                                        } else {
                                                            replaceComponent = 'AreaComponent';
                                                        }
                                                    }

                                                    // 替换自定义组件
                                                    newContextItemValue['resource']['compiledPath'] = contextItemValue['resource']['compiledPath'].replaceAll(componentName, replaceComponent);

                                                    newContextItemValue['resource']['dependenciesPath'] = contextItemValue['resource']['dependenciesPath'].replaceAll(componentName, replaceComponent);

                                                    newContextItemValue['resource']['propsConfigPath'] = contextItemValue['resource']['propsConfigPath'].replaceAll(componentName, replaceComponent);

                                                    newContextItemValue['resource']['sourcePath'] = contextItemValue['resource']['sourcePath'].replaceAll(componentName, replaceComponent);

                                                    newContextItemValue['componentName'] = replaceComponent;

                                                    if (Object.prototype.toString.call(data) === '[object Object]') {
                                                        if (data.videoObject) {
                                                            videoObj.push({
                                                                name: itemJson.content.propertyValues.name,
                                                                data: contextItem.a.data,
                                                                htData: contextItem.p,
                                                            });
                                                        }

                                                        // if (data.linkId && data.factoryModelId) {
                                                        //     console.log(data);
                                                        //     debugger;
                                                        // }

                                                        // 排除统计数据干扰项
                                                        const newData = JSON.parse(JSON.stringify(data));
                                                        delete newData['lineHeight'];
                                                        delete newData['alarmOrWork'];
                                                        delete newData['dataType'];
                                                        delete newData['fontColor'];
                                                        delete newData['fontSize'];
                                                        delete newData['isShowName'];
                                                        // delete newData['linkId'];
                                                        delete newData['text'];
                                                        // 统计自定义组件data数据
                                                        allDataKey[JSON.stringify(Object.keys(newData).sort())] = true;
                                                        // 统计自定义组件data数据
                                                        Object.entries(newData).forEach(([key, value]) => {
                                                            if (!allDataValue[key]) allDataValue[key] = {};
                                                            if (typeof value === 'string' || typeof value === 'number') {
                                                                allDataValue[key][value] = true;
                                                            } else {
                                                                allDataValue[key][JSON.stringify(value)] = true;
                                                            }
                                                        });

                                                        // 将旧的data数据替换为新的data数据
                                                        const { text, title, fontSize } = data;
                                                        // 只有装置显示title
                                                        if (replaceComponent === 'AreaComponent' || AreaDeviceMap[componentName] === 'AreaOrDeviceOrVideo') {
                                                            const name = title || text;
                                                            const size = fontSize;
                                                            const nameKey = replaceComponent === 'AreaComponent' ? 'area-name' : 'device-v2-name';
                                                            const sizeKey = replaceComponent === 'AreaComponent' ? 'area-fontSize' : 'device-v2-fontSize';

                                                            if (name) newContextItemValue['data'] = { ...newContextItemValue['data'], [nameKey]: name };
                                                            if (size) newContextItemValue['data'] = { ...newContextItemValue['data'], [sizeKey]: size };
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                });
                            }

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
        });
    };

    const convertPath = path.join(__dirname, './BeforeConversion');
    const outPath = path.join(__dirname, './AfterConversion');
    const otherData = path.join(__dirname, './OtherData');

    if (!fs.existsSync(convertPath)) {
        console.log('不存在文件夹', convertPath);
        return;
    }

    console.log('开始转换...');

    exec(convertPath, outPath);

    // 保存video数据
    if (!fs.existsSync(otherData)) fs.mkdirSync(otherData, { recursive: true });
    fs.writeFileSync(path.join(otherData, 'video.json'), JSON.stringify(videoObj));
    fs.writeFileSync(path.join(otherData, 'bg.json'), JSON.stringify(allBgImage));

    console.log('转换完成...');

    console.log(allDataValue);
    console.log(allDataKey);
    debugger;
};

export default convert;
