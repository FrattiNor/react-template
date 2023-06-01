export const ALARM_OBJ: Record<string, { level: number; color: string; name: string }> = {
    '-1': { level: -1, color: '#8C8C8C', name: '未绑定工厂模型' },
    '0': { level: 0, color: '#237804', name: '报警已经消除' },
    '2': { level: 2, color: '#F5A623', name: '报警未消除但已确认' },
    '1': { level: 1, color: '#CF1322', name: '报警未消除未确认' },
};

export const getColor = (level: number) => {
    if (typeof level === 'number' && level >= 0 && level <= 3) return ALARM_OBJ[level].color;
    return ALARM_OBJ[0].color;
};
