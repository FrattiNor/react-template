import { AlarmHistoryItem, AlarmRealtimeItem } from '@/services/alarm';
import KeyValueTable, { Tr } from '@/components/KeyValueTable';
import Collapse from '@/components/Collapse';
import AlarmLevelTag from '../AlarmLevelTag';
import AlarmAckTag from '../AlarmAckTag';
import styles from './index.module.less';
import timeTool from '@/utils/timeTool';
import notEmpty from '@/utils/notEmpty';
import useConst from '@/hooks/useConst';
import { useCallback } from 'react';

const showAlarmLevel = (level: number) => <AlarmLevelTag level={level} />;

const showIsAcked = (isAcked: number) => <AlarmAckTag isAcked={isAcked} />;

export const useRender = () => {
    const { ALARM_STATUS_MAP } = useConst();

    const renderHistoryItem = useCallback(
        (item: AlarmHistoryItem, { visible }: { visible: boolean }) => (
            <div className={styles['item']}>
                <KeyValueTable>
                    <Tr>报警等级:{showAlarmLevel(item.alarmLevel)}</Tr>
                    <Tr>报警时间:{notEmpty(item.alarmTime, () => timeTool.toStrByNum(item.alarmTime))}</Tr>
                    <Tr>报警状态:{notEmpty(ALARM_STATUS_MAP.get(item.alarmStatus))}</Tr>
                </KeyValueTable>
                <Collapse visible={visible}>
                    <KeyValueTable>
                        <Tr>记录时间:{notEmpty(item.createTime, () => timeTool.toStrByNum(item.createTime))}</Tr>
                        <Tr>厂商:{notEmpty(item.mfr)}</Tr>
                        <Tr>设备类型:{notEmpty(item.deviceModel)}</Tr>
                        <Tr>ISDM位号:{notEmpty(item.tagName)}</Tr>
                        <Tr>工厂模型:{notEmpty(item.areaName)}</Tr>
                        <Tr>报警建议:{notEmpty(item.alarmSuggestion)}</Tr>
                        <Tr>报警事件描述:{notEmpty(item.alarmName)}</Tr>
                    </KeyValueTable>
                </Collapse>
            </div>
        ),
        [],
    );

    const renderRealtimeItem = useCallback(
        (item: AlarmRealtimeItem, { visible }: { visible: boolean }) => (
            <div className={styles['item']}>
                <KeyValueTable>
                    <Tr>报警等级:{showAlarmLevel(item.alarmType)}</Tr>
                    <Tr>报警时间:{notEmpty(item.alarmTime, () => timeTool.toStrByNum(item.alarmTime))}</Tr>
                    <Tr>报警状态:{notEmpty(ALARM_STATUS_MAP.get(item.alarmStatus))}</Tr>
                </KeyValueTable>
                <Collapse visible={visible}>
                    <KeyValueTable>
                        <Tr>是否确认:{showIsAcked(item.isAcked)}</Tr>
                        <Tr>厂商:{notEmpty(item.mfr)}</Tr>
                        <Tr>设备类型:{notEmpty(item.deviceModel)}</Tr>
                        <Tr>ISDM位号:{notEmpty(item.isdmTag)}</Tr>
                        <Tr>工厂模型:{notEmpty(item.areaName)}</Tr>
                        <Tr>报警建议:{notEmpty(item.alarmSuggestion)}</Tr>
                        <Tr>确认消息:{notEmpty(item.message)}</Tr>
                        <Tr>报警事件描述:{notEmpty(item.alarmName)}</Tr>
                    </KeyValueTable>
                </Collapse>
            </div>
        ),
        [],
    );

    return { renderHistoryItem, renderRealtimeItem };
};
