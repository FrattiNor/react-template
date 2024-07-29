/* eslint-disable no-debugger */
import { btoa, atob, transformEquipmentId } from './utils.js';
// import { AreaDeviceMap, getImageMap } from './map.js';
import { fileURLToPath } from 'url';
import { rimrafSync } from 'rimraf';
import path from 'path';
import fs from 'fs';
import { componentMap } from './map.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const convert = async (_oldAppId: string, _newAppId: string) => {
    const oldAppId = _oldAppId === '' ? undefined : _oldAppId;
    const newAppId = _newAppId === '' ? undefined : _newAppId;

    const replaceAppId = (text: string) => {
        if (typeof oldAppId === 'string' && typeof newAppId === 'string') {
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
                                    const contextItemValue = contextItem?.a;
                                    const newContextItem = newContextData[i];
                                    const newContextItemValue = newContextItem?.a;

                                    if (Object.prototype.toString.call(contextItemValue) === '[object Object]') {
                                        const { widgetName, componentName, data } = contextItemValue;
                                        // 存在 widget
                                        if (typeof widgetName === 'string') {
                                            //  widget是自定义组件 并且 存在组件名称

                                            if (widgetName === 'CustomComp' && typeof componentName === 'string') {
                                                const replaceComponent = componentMap[componentName];
                                                if (replaceComponent) {
                                                    newContextItemValue['resource']['compiledPath'] = contextItemValue['resource']['compiledPath'].replaceAll(componentName, replaceComponent);
                                                    newContextItemValue['resource']['dependenciesPath'] = contextItemValue['resource']['dependenciesPath'].replaceAll(componentName, replaceComponent);
                                                    newContextItemValue['resource']['propsConfigPath'] = contextItemValue['resource']['propsConfigPath'].replaceAll(componentName, replaceComponent);
                                                    newContextItemValue['resource']['sourcePath'] = contextItemValue['resource']['sourcePath'].replaceAll(componentName, replaceComponent);
                                                    newContextItemValue['componentName'] = replaceComponent;

                                                    if (Object.prototype.toString.call(data) === '[object Object]') {
                                                        // 替换name和size
                                                        const { text, title, fontSize, factoryModelId, equipmentId } = data;
                                                        const name = title || text;
                                                        const size = fontSize;
                                                        const nameKey = replaceComponent === 'AreaComponent' ? 'area-name' : 'device-v2-name';
                                                        const sizeKey = replaceComponent === 'AreaComponent' ? 'area-fontSize' : 'device-v2-fontSize';
                                                        if (name) newContextItemValue['data'] = { ...newContextItemValue['data'], [nameKey]: name };
                                                        if (size) newContextItemValue['data'] = { ...newContextItemValue['data'], [sizeKey]: size };
                                                        // 装置替换工厂Id
                                                        if (factoryModelId && replaceComponent === 'AreaComponent') {
                                                            const _factoryModelId = Array.isArray(factoryModelId) ? factoryModelId[factoryModelId.length - 1] : factoryModelId;
                                                            const nextFactoryModelId = typeof _factoryModelId === 'string' ? _factoryModelId : undefined;
                                                            if (nextFactoryModelId) {
                                                                newContextItemValue['data'] = { ...newContextItemValue['data'], ['area-factoryModelIds']: { factoryModelId: nextFactoryModelId } };
                                                            }
                                                        }
                                                        // 设备设置模板为无
                                                        if (replaceComponent === 'DeviceComponentV2') {
                                                            newContextItemValue['data'] = { ...newContextItemValue['data'], ['device-v2-template']: 'None' };
                                                        }
                                                        // 设备替换isdmTag
                                                        if (replaceComponent === 'DeviceComponentV2' && equipmentId) {
                                                            const currentIsdmTag = typeof equipmentId === 'string' ? equipmentId : undefined;
                                                            if (currentIsdmTag) {
                                                                const nextIsdmTag = (await transformEquipmentId(currentIsdmTag)).data;
                                                                if (nextIsdmTag) {
                                                                    newContextItemValue['data'] = { ...newContextItemValue['data'], ['device-v2-deviceInfo']: { isdmTag: nextIsdmTag } };
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
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
