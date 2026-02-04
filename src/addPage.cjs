/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { gotInstance } = require('./utils.cjs');
const { getConfig } = require('./getConfig.cjs');
const { getComponents } = require('./getComponent.cjs');
const { getComponents2 } = require('./getComponent2.cjs');

// 添加页面
const addPage = async ({ name, type }) => {
    const { suposHost, ticket, appId, parentId, width, height } = getConfig();

    // 获取context模板
    const contextJSON = JSON.parse(fs.readFileSync(path.join(__dirname, './context.json'), 'utf-8'));
    // 获取模板内layoutIndex
    const layoutIndex = contextJSON.context.jsonData.a.layoutIndex;
    // 根据type生成component
    if (type === '1') {
        contextJSON.context.jsonData.d = getComponents(appId, layoutIndex, width, height);
    } else {
        contextJSON.context.jsonData.d = getComponents2(appId, layoutIndex, width, height);
    }
    // 替换模板内数据
    contextJSON.context.jsonData.a.width = width;
    contextJSON.context.jsonData.a.height = height;
    contextJSON.context.jsonData.contentRect.width = width;
    contextJSON.context.jsonData.contentRect.height = height;
    contextJSON.context.jsonData.modified = new Date().toString();

    // 新增页面参数
    const params = {
        name,
        description: '',
        layout: '',
        type: 1,
        url: '',
        parentId,
        appId,
        kind: 'free',
        platformType: 'PC',
        menuDisplay: true,
        mobileShowType: 'auto',
        navbarStyle: 'fixed',
        navbarBgColor: '#ffffff',
        navbarFront: 'dark',
        isWorkflow: false,
        layouts: [
            {
                description: '',
                context: JSON.stringify(contextJSON),
            },
        ],
    };

    // 新增页面
    const res = await gotInstance(`${suposHost}/open-api/p/compose/v2/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${ticket}` },
        body: JSON.stringify(params),
    });

    const pageId = JSON.parse(res.body)['location'];

    // 查询页面
    const res2 = await gotInstance(`${suposHost}/open-api/p/compose/v2/pages/${pageId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${ticket}` },
    });

    const layout = JSON.parse(JSON.parse(res2.body)['layout']);
    layout.layoutNodes[0].lw = width;
    layout.layoutNodes[0].lh = height;
    layout.pageConfig.lwValue = width;
    layout.pageConfig.lhValue = height;

    // 修改页面
    await gotInstance(`${suposHost}/open-api/p/compose/v2/pages/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${ticket}` },
        body: JSON.stringify({ layout: JSON.stringify(layout) }),
    });
};

module.exports = { addPage };
