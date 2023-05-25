import { AlarmHistoryItem, AlarmRealtimeItem } from '@/services/alarm';
import KeyValueTable, { KeyValueProvider, Tr } from '@/components/KeyValueTable';
import { Fragment, useCallback } from 'react';
import Collapse from '@/components/Collapse';
import styles from './index.module.less';
import timeTool from '@/utils/timeTool';
import notEmpty from '@/utils/notEmpty';
import useConst from '@/hooks/useConst';
import Tag from './Tag';

export const useRender = () => {
    const { ALARM_STATUS_MAP, ALARM_LEVEL_COLOR_MAP, ALARM_LEVEL_MAP, ALARM_CONFIRM_COLOR_MAP, ALARM_CONFIRM_MAP } = useConst();

    const renderLevel = useCallback(
        (level: number) => (
            <Fragment>
                {notEmpty(level, () => (
                    <Tag bg={ALARM_LEVEL_COLOR_MAP.get(level)}>{notEmpty(ALARM_LEVEL_MAP.get(level))}</Tag>
                ))}
            </Fragment>
        ),
        [],
    );

    const renderAck = useCallback(
        (ack: number) => (
            <Fragment>
                {notEmpty(ack, () => (
                    <Tag bg={ALARM_CONFIRM_COLOR_MAP.get(ack)}>{notEmpty(ALARM_CONFIRM_MAP.get(ack))}</Tag>
                ))}
            </Fragment>
        ),
        [],
    );

    const renderHistoryItem = useCallback(
        (item: AlarmHistoryItem, { visible }: { visible: boolean }) => (
            <KeyValueProvider widthClassNames={[styles['key']]}>
                <KeyValueTable>
                    <Tr>报警等级:{renderLevel(item.alarmLevel)}</Tr>
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
            </KeyValueProvider>
        ),
        [],
    );

    const renderRealtimeItem = useCallback(
        (item: AlarmRealtimeItem, { visible }: { visible: boolean }) => (
            <KeyValueProvider widthClassNames={[styles['key']]}>
                <KeyValueTable>
                    <Tr>报警等级:{renderLevel(item.alarmType)}</Tr>
                    <Tr>报警时间:{notEmpty(item.alarmTime, () => timeTool.toStrByNum(item.alarmTime))}</Tr>
                    <Tr>报警状态:{notEmpty(ALARM_STATUS_MAP.get(item.alarmStatus))}</Tr>
                </KeyValueTable>
                <Collapse visible={visible}>
                    <KeyValueTable>
                        <Tr>是否确认:{renderAck(item.isAcked)}</Tr>
                        <Tr>厂商:{notEmpty(item.mfr)}</Tr>
                        <Tr>设备类型:{notEmpty(item.deviceModel)}</Tr>
                        <Tr>ISDM位号:{notEmpty(item.isdmTag)}</Tr>
                        <Tr>工厂模型:{notEmpty(item.areaName)}</Tr>
                        <Tr>报警建议:{notEmpty(item.alarmSuggestion)}</Tr>
                        <Tr>确认消息:{notEmpty(item.message)}</Tr>
                        <Tr>报警事件描述:{notEmpty(item.alarmName)}</Tr>
                    </KeyValueTable>
                </Collapse>
            </KeyValueProvider>
        ),
        [],
    );

    return { renderHistoryItem, renderRealtimeItem };
};
