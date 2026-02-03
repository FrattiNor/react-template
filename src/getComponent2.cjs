const data = [
    { value: 100, color: 'red', name: '公用工程区海水泵房' },
    { value: 7, color: 'black', name: '公用工程区闭式循环水场' },
    { value: 4, color: 'blue', name: '热工单元' },
    { value: 1, color: 'white', name: '化工区海水泵房' },
    { value: 5, color: 'green', name: '化工区闭式循环水场' },
    { value: 9, color: 'grey', name: '化工区给水及雨水' },
    { value: 9, color: 'grey', name: '化工区制冷站' },
    { value: 9, color: 'grey', name: '炼油区闭式循环水场' },
    { value: 9, color: 'grey', name: '炼油区给水及消防' },
    { value: 9, color: 'grey', name: '炼油区海水泵房' },
    { value: 9, color: 'grey', name: '炼油区四小站' },
    { value: 9, color: 'grey', name: '炼油区制冷站二' },
    { value: 9, color: 'grey', name: '煤制氢联合' },
    { value: 9, color: 'grey', name: '火炬设施' },
    { value: 9, color: 'grey', name: '工艺及热力管网' },
];

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

const getCount = (count) => {
    let xCount = 0;
    let yCount = 0;
    if (count <= 4 * 3) {
        xCount = 4;
        yCount = 3;
        return { xCount, yCount };
    }
    if (count <= 5 * 3) {
        xCount = 5;
        yCount = 3;
        return { xCount, yCount };
    }
    if (count <= 5 * 4) {
        xCount = 5;
        yCount = 4;
        return { xCount, yCount };
    }
    if (count <= 6 * 4) {
        xCount = 6;
        yCount = 4;
        return { xCount, yCount };
    }
    return { xCount, yCount };
};

const getComponents2 = (appId, layoutIndex, pageWidth, pageHeight) => {
    const { xCount, yCount } = getCount(data.length);

    const containerWidth = Math.floor(pageWidth * 0.8);
    const containerHeight = Math.floor(pageHeight * 0.8);
    const addX = Math.floor((pageWidth - containerWidth) / 2);
    const addY = Math.floor((pageHeight - containerHeight) / 2);
    const distance = Math.floor(Math.min(containerWidth, containerHeight) * 0.02);
    const width = Math.floor((containerWidth - (xCount - 1) * distance) / xCount);
    const height = Math.floor((containerHeight - (yCount - 1) * distance) / yCount);
    const minSize = Math.min(width, height);
    const fontSize = Math.floor(Math.min(minSize / 2, 30));

    return data.map((item, index) => {
        const x = index % xCount;
        const y = Math.floor(index / xCount);

        const xSize = addX + x * (width + distance);
        const ySize = addY + y * (height + distance);

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
        c.p.position.x = xSize + width / 2;
        c.p.position.y = ySize + height / 2;
        c.p.width = width;
        c.p.height = height;
        c.a.data['area-name'] = item.name;
        c.a.data['area-fontSize'] = `${fontSize}`;
        return c;
    });
};

module.exports = { getComponents2 };
