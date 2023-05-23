// === Map属性 ===
// size：返回映射中的元素个数
// === Map方法 ===
// clear：从映射中移除所有元素
// delete：从映射中移除指定元素
// forEach：遍历映射中每个元素
// get：获得映射中指定元素
// has：判断映射是否含有某个元素
// set：添加一个新建元素的映射
// toString：返回映射字符串表示形式
// valueOf：返回指定对象的原始值

// 报警等级
export const ALARM_LEVEL_MAP: Map<number, string> = new Map([
    [0, '故障'],
    [1, '维护'],
    [2, '通知'],
    [3, '未分类'],
]);

// 报警等级 颜色
export const ALARM_LEVEL_COLOR_MAP: Map<number, string> = new Map([
    [0, '#f5222d'],
    [1, '#fd622f'],
    [2, '#ff9626'],
    [3, '#8c8c8c'],
]);

// 报警状态
export const ALARM_STATUS_MAP: Map<number, string> = new Map([
    [0, '消除'],
    [1, '产生'],
]);

// 健康度Tab
export const HEALTH_TAB_MAP: Map<number, string> = new Map([
    [1, '控制系统'],
    [5, '现场仪表'],
]);

// 模块类型
export const MODULE_TYPE_MAP: Map<number, string> = new Map([
    [1, '控制器'],
    [2, 'IO连接模块'],
    [3, 'IO卡件'],
]);

// 健康度等级
export const HEALTH_LEVEL_MAP: Map<number, string> = new Map([
    [1, '健康'],
    [2, '报警'],
    [3, '故障'],
]);

// 健康度等级 颜色
export const HEALTH_LEVEL_COLOR_MAP: Map<number, string> = new Map([
    [1, '#12B88C'],
    [2, '#EBD12A'],
    [3, '#F55858'],
]);

// 数据采集导入结果
export const RESULT_MAP: Map<number, string> = new Map([
    [0, '失败'],
    [1, '成功'],
]);

// 数据采集导入结果图片
// export const RESULT_PNG_MAP: Map<number, string> = new Map([
//     [0, FailPng],
//     [1, SuccessPng],
// ]);

// 机柜节点
export const NODE_TYPE_MAP: Map<string, string> = new Map([
    ['aisle', '过道'],
    ['cabinet', '机柜'],
]);

// 机柜节点颜色

export const NODE_COLOR_MAP: Map<string | number, string> = new Map([
    // 非编辑状态，使用status
    [0, '#12B88C'],
    [1, '#F55858'],
    [2, '#EBD12A'],
    // 编辑状态
    ['edit', '#467be6'],
    ['active', '#2E5299'],
] as [string | number, string][]);

// 报警是否确认
export const ALARM_CONFIRM_MAP: Map<number, string> = new Map([
    [0, '未确认'],
    [1, '已确认'],
]);

// 报警是否确认颜色
export const ALARM_CONFIRM_COLOR_MAP: Map<number, string> = new Map([
    [0, '#f5222d'],
    [1, '#ff9626'],
]);

// 设备台账自定义字段显示搜索
export const FIELD_SHOW_SEARCH_MAP: Map<number, string> = new Map([
    [0, '隐藏'],
    [1, '显示'],
]);

// 设备台账 来源
export const DEVICE_ORIGIN_MAP: Map<number, string> = new Map([
    // [1, 'VF'],
    [2, 'IDM'],
    [3, '手动导入'],
]);

// 自定义布尔类型
export const BOOLEAN_OBJ_MAP: Map<string, string> = new Map([
    ['true', '是'],
    ['false', '否'],
]);

// 自定义字段类型
export const FIELD_TYPE_OBJ_MAP: Map<string, string> = new Map([
    ['STRING', '字符串'],
    ['BOOLEAN', '布尔'],
    ['DATE', '日期'],
    ['DOUBLE', '浮点'],
    ['INTEGER', '整型'],
]);

// 自定义字段最大长度
export const FILED_TYPE_HAVE_MAX_LENGTH_MAP: Map<string, number> = new Map([
    ['STRING', 1],
    ['BOOLEAN', 0],
    ['DATE', 0],
    ['DOUBLE', 2],
    ['INTEGER', 1],
]);

// 数据源类型
export const ORIGIN_TYPE_MAP: Map<number, string> = new Map([
    [1, 'opc da'],
    [2, 'opc ae'],
    [3, 'supos'],
]);

// 授权信息
export const AUTH_INFO_MAP: Map<number, string> = new Map([
    [0, '未授权'],
    [1, '已授权'],
    [2, '试用'],
]);

// 授权信息颜色
export const AUTH_INFO_COLOR_MAP: Map<number, string> = new Map([[0, '#F55858']]);

// 同步数据状态
export const SYNC_DATA_STATUS_MAP: Map<number, string> = new Map([
    [0, '新增'],
    [1, '删除'],
    [2, '更新'],
]);

// 同步数据状态
export const SYNC_DATA_STATUS_COLOR_MAP: Map<number, string> = new Map([
    [0, '#52c41a'],
    [1, '#f5222d'],
    [2, '#faad14'],
]);

// 设备状态
// export const DEVICE_STATUS_MAP: Map<number, string> = new Map([
//     [1, '正常'],
//     [2, '异常'],
//     [3, '废弃'],
// ]);

// 国际化
export const I18N_MAP: Map<string, string> = new Map([
    ['zh-CN', '简体中文'],
    ['en-US', 'English'],
]);

// 位号类型
export const POINT_TYPE_MAP: Map<number, string> = new Map([
    [1, '开关量'],
    [2, '模拟量'],
]);

// 位号优先级
export const POINT_PRIORITY_MAP: Map<number, string> = new Map([
    [1, '高'],
    [2, '中'],
    [3, '低'],
]);

// 位号 数字量 报警类型
export const POINT_ALARM_TYPE_MAP: Map<number, string> = new Map([
    [1, '开报警'],
    [2, '关报警'],
]);

// 位号 历史 触发方式
export const POINT_HISTORY_TYPE_MAP: Map<number, string> = new Map([
    [1, '关 -> 开触发'],
    [2, '开 -> 关触发'],
    [3, '开关都触发'],
]);

// 设备台账视图
export const DEVICE_VIEW_MAP: Map<number, string> = new Map([
    [1, '仪表'],
    [2, '卡件'],
]);

// 设备类型
export const DEVICE_CATEGORY_MAP: Map<number, string> = new Map([
    [-1, '仪表'],
    [0, '电源'],
    [1, '控制卡'],
    [2, 'IO连接'],
    [3, 'IO'],
    [4, '机架'],
    [5, '接地'],
]);

// 设备模式状态
export const DEVICE_DEV_MODE: Map<number, string> = new Map([
    [0, '缺省'],
    [1, '备用'],
    [2, '启用'],
    [3, '废弃'],
]);

// 邮件发送频率
export const MAIL_FREQUENCY_MAP: Map<string, string> = new Map([['daily', '每天']]);

// （周月报）报告类型
export const REPORT_TYPE_MAP: Map<string, string> = new Map([
    ['ALARM_EVENT', '报警事件排行'],
    ['ALARM_LEVEL', '报警等级分布'],
    ['ALARM_DEVICE_TOP10', '报警设备排行（Top10）'],
    ['ALARM_DEVICE_TYPE', '报警设备类型分布'],
    ['DEVICE_ALARM', '每日设备报警数量'],
    ['ALARM_INTEGRITY', '全厂报警完好率'],
    ['ALARM_NAME', '报警描述分类统计图（Top15）'],
]);

// 诊断项是否报警
export const DIAGNOSE_IS_ALARM_MAP: Map<number, string> = new Map([
    [0, '否'],
    [1, '是'],
]);

// 诊断项值报警等级
export const DIAGNOSE_ALARM_LEVEL_MAP: Map<number, string> = new Map([
    [1, '通知'],
    [2, '轻故障'],
    [3, '重故障'],
]);

// 通知策略类型
export const NOTICE_POLICY_RANGE_MAP: Map<string, string> = new Map([
    ['STAFF', '用户'],
    ['POSITION', '岗位'],
    ['DEPARTMENT', '部门'],
    ['ROLE', '角色'],
]);

export const NOTICE_POLICY_TYPE_MAP: Map<string, string> = new Map([
    ['email', '邮件'],
    ['stationLetter', '站内信'],
]);

export const REPORT_FREQUENCY_MAP: Map<string, string> = new Map([['daily', '每天']]);

export const VALVE_TYPE_MAP: Map<number, string> = new Map([
    [0, '主动'],
    [1, '被动'],
]);

// 全部常量
export const AllConst = {
    ALARM_LEVEL_MAP,
    ALARM_LEVEL_COLOR_MAP,
    ALARM_STATUS_MAP,
    HEALTH_TAB_MAP,
    MODULE_TYPE_MAP,
    HEALTH_LEVEL_MAP,
    HEALTH_LEVEL_COLOR_MAP,
    RESULT_MAP,
    // RESULT_PNG_MAP,
    NODE_TYPE_MAP,
    NODE_COLOR_MAP,
    ALARM_CONFIRM_MAP,
    ALARM_CONFIRM_COLOR_MAP,
    FIELD_SHOW_SEARCH_MAP,
    DEVICE_ORIGIN_MAP,
    BOOLEAN_OBJ_MAP,
    FIELD_TYPE_OBJ_MAP,
    FILED_TYPE_HAVE_MAX_LENGTH_MAP,
    ORIGIN_TYPE_MAP,
    AUTH_INFO_MAP,
    AUTH_INFO_COLOR_MAP,
    I18N_MAP,
    POINT_TYPE_MAP,
    POINT_PRIORITY_MAP,
    POINT_ALARM_TYPE_MAP,
    POINT_HISTORY_TYPE_MAP,
    SYNC_DATA_STATUS_MAP,
    SYNC_DATA_STATUS_COLOR_MAP,
    DEVICE_VIEW_MAP,
    DEVICE_CATEGORY_MAP,
    MAIL_FREQUENCY_MAP,
    REPORT_TYPE_MAP,
    DEVICE_DEV_MODE,
    DIAGNOSE_IS_ALARM_MAP,
    DIAGNOSE_ALARM_LEVEL_MAP,
    NOTICE_POLICY_TYPE_MAP,
    NOTICE_POLICY_RANGE_MAP,
    REPORT_FREQUENCY_MAP,
    VALVE_TYPE_MAP,
};
