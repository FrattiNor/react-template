export type AlarmHistoryListItem = {
    alarmId: string;
    alarmLevel: number;
    mfr: string;
    alarmName: string;
    alarmStatus: number;
    alarmSuggestion: string;
    alarmTime: string;
    deviceId: string;
    deviceModel: string;
    duration: string;
    ne107: number;
    tagName: string;
    areaName: string;
    createTime: string;
};

export type AlarmRealtimeListItem = {
    areaId: string;
    areaName: string;
    deviceModel: string;
    protocol: string;
    mfr: string;
    isdmTag: string;
    tagName: string;
    deviceId: string;
    dmDeviceId: string;
    alarmId: string;
    alarmName: string;
    alarmStatus: number;
    alarmSuggestion: string;
    alarmTime: string;
    alarmType: number;
    isAcked: number;
    message: string;
};

export type AreaItem = {
    areaLevel: number;
    areaName: string;
    id: string;
};
