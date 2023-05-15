export type DeviceListParams = {
    view: number; // 0 1;
    [key: string]: any;
};

export type DeviceListItem = {
    id: string; // ID
    sourceType: number; //  设备来源
    areaRef: string; // 工厂模型
    mfrName: string; // 厂商
    deviceModel: string; // 设备类型
    identifier: string; // 设备身份码
    onlineTime: string; // 最近上线时间
    wkDay: string; // 累计运行时间
    category: number; // 类别
    protocol: string; // 协议
    isdmTag: string; // ISDM位号
    deviceTag: string; // 仪表位号
    systemTag: string; // 系统位号
    devMode: number; // 模式状态
};
