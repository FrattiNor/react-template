/* eslint-disable @typescript-eslint/no-var-requires */
const { getTreemap } = require('./treemap/index.cjs');

const treemapWidth = 700;
const treemapHeight = 600;

const result = getTreemap({
    data: [
        { value: 10, color: 'red', name: '公用工程区海水泵房' },
        { value: 7, color: 'black', name: '公用工程区闭式循环水场' },
        { value: 4, color: 'blue', name: '热工单元' },
        { value: 1, color: 'white', name: '化工区海水泵房' },
        { value: 5, color: 'green', name: '化工区闭式循环水场' },
        { value: 9, color: 'grey', name: '化工区给水及雨水' },
    ],
    width: treemapWidth,
    height: treemapHeight,
});

const component = {
    c: 'ht.Node',
    i: 285,
    p: {
        displayName: 'CustomComp-1-g2',
        layer: '0',
        tag: 'htDiv-m4xgueux0-5963',
        image: 'htDiv',
        position: {
            x: 150,
            y: 150,
        },
        width: 300,
        height: 300,
    },
    a: {
        appDetail: {
            appId: 'App_15db323f85131b4111c8dafe2cd4cbd5',
        },
        widgetName: 'CustomComp',
        componentName: 'AreaComponent',
        resource: {
            sourcePath: '/resource/App_15db323f85131b4111c8dafe2cd4cbd5/extensions/AreaComponent/source/index.js',
            compiledPath: '/resource/App_15db323f85131b4111c8dafe2cd4cbd5/extensions/AreaComponent/compiled/index.js',
            propsConfigPath: '/resource/App_15db323f85131b4111c8dafe2cd4cbd5/extensions/AreaComponent/index.json',
            dependenciesPath: '/resource/App_15db323f85131b4111c8dafe2cd4cbd5/extensions/AreaComponent/dependencies.json',
        },
        position: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            topOfPer: 0,
            rightOfPer: 0,
            bottomOfPer: 0,
            leftOfPer: 0,
        },
        isPreviewInDesign: true,
        data: {
            'device-deviceInfo': {
                factoryModelId: '411797017291915264',
                deviceId: '412774508798148608',
            },
            'device-v2-deviceInfo': {
                isdmTag: '',
            },
            'area-factoryModelIds': {
                factoryModelId: '463246579558514688',
            },
            'area-name': '工艺及热力\n管网',
            'area-fontSize': '27',
        },
        dataReplace: null,
    },
};

const getComponents = (appId, layoutIndex, pageWidth, pageHeight) => {
    const addX = Math.floor((pageWidth - treemapWidth) / 2);
    const addY = Math.floor((pageHeight - treemapHeight) / 2);

    return result.map((item, index) => {
        const x = Math.floor(item.x);
        const y = Math.floor(item.y);
        const x2 = Math.floor(item.width + item.x) - 2;
        const y2 = Math.floor(item.height + item.y) - 2;
        const width = x2 - x;
        const height = y2 - y;
        const minSize = Math.min(width, height);
        const fontSize = Math.floor(Math.min(minSize / 2, 30));

        const c = JSON.parse(JSON.stringify(component));
        const i = index;
        const displayName = `CustomComp-${index}`;
        const tag = `htDiv-${layoutIndex}-${index}`;
        const oldAppId = c.a.appDetail.appId;
        c.a.appDetail.appId = appId;
        c.a.resource.sourcePath = c.a.resource.sourcePath.replace(oldAppId, appId);
        c.a.resource.compiledPath = c.a.resource.compiledPath.replace(oldAppId, appId);
        c.a.resource.propsConfigPath = c.a.resource.propsConfigPath.replace(oldAppId, appId);
        c.a.resource.dependenciesPath = c.a.resource.dependenciesPath.replace(oldAppId, appId);
        c.c.i = i;
        c.p.displayName = displayName;
        c.p.tag = tag;
        c.p.position.x = addX + x + width / 2;
        c.p.position.y = addY + y + height / 2;
        c.p.width = width;
        c.p.height = height;
        c.a.data['area-name'] = item.data.name;
        c.a.data['area-fontSize'] = `${fontSize}`;
        return c;
    });
};

module.exports = { getComponents };
