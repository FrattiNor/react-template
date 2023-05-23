import { useAlarmHistoryList, useAlarmRealtimeList } from '@/services/alarm';
import { createInfiniteListItem } from '@/components/InfiniteLists/utils';
import { useHistoryFilters, useRealtimeFilters } from './useFilters';
import TableLike, { Line } from '@/components/TableLike';
import InfiniteLists from '@/components/InfiniteLists';
import Collapse from '@/components/Collapse';
import AlarmLevelTag from './AlarmLevelTag';
import Header from '@/components/Header';
import styles from './index.module.less';
import timeTool from '@/utils/timeTool';
import notEmpty from '@/utils/notEmpty';
import AlarmAckTag from './AlarmAckTag';
import { useConst } from '@/hooks';

const Device = () => {
    const historyFilterList = useHistoryFilters();
    const realtimeFilterList = useRealtimeFilters();

    const { ALARM_STATUS_MAP } = useConst();
    const queryHistory = useAlarmHistoryList();
    const queryRealtime = useAlarmRealtimeList();
    const showAlarmLevel = (level: number) => <AlarmLevelTag level={level} />;
    const showIsAcked = (isAcked: number) => <AlarmAckTag isAcked={isAcked} />;

    return (
        <Header boxShadow={false}>
            <InfiniteLists
                items={[
                    createInfiniteListItem({
                        title: '历史报警',
                        rowKey: 'alarmId',
                        query: queryHistory,
                        enableVisible: true,
                        filter: { filterList: historyFilterList },
                        renderItem: (item, { visible }) => (
                            <div className={styles['item']}>
                                <TableLike className={{ 0: styles['key'], 1: styles['value'] }}>
                                    <Line>报警等级:{showAlarmLevel(item.alarmLevel)}</Line>
                                    <Line>报警时间:{notEmpty(item.alarmTime, () => timeTool.toStrByNum(item.alarmTime))}</Line>
                                    <Line>报警状态:{notEmpty(ALARM_STATUS_MAP.get(item.alarmStatus))}</Line>
                                    <Collapse visible={visible}>
                                        <Line>记录时间:{notEmpty(item.createTime, () => timeTool.toStrByNum(item.createTime))}</Line>
                                        <Line>厂商:{notEmpty(item.mfr)}</Line>
                                        <Line>设备类型:{notEmpty(item.deviceModel)}</Line>
                                        <Line>ISDM位号:{notEmpty(item.tagName)}</Line>
                                        <Line>工厂模型:{notEmpty(item.areaName)}</Line>
                                        <Line>报警事件描述:{notEmpty(item.alarmName)}</Line>
                                        <Line>报警建议:{notEmpty(item.alarmSuggestion)}</Line>
                                    </Collapse>
                                </TableLike>
                            </div>
                        ),
                    }),
                    createInfiniteListItem({
                        title: '实时报警',
                        rowKey: 'alarmId',
                        query: queryRealtime,
                        enableVisible: true,
                        filter: { filterList: realtimeFilterList },
                        renderItem: (item, { visible }) => (
                            <div className={styles['item']}>
                                <TableLike className={{ 0: styles['key'], 1: styles['value'] }}>
                                    <Line>报警等级:{showAlarmLevel(item.alarmType)}</Line>
                                    <Line>报警时间:{notEmpty(item.alarmTime, () => timeTool.toStrByNum(item.alarmTime))}</Line>
                                    <Line>报警状态:{notEmpty(ALARM_STATUS_MAP.get(item.alarmStatus))}</Line>
                                    <Collapse visible={visible}>
                                        <Line>是否确认:{showIsAcked(item.isAcked)}</Line>
                                        <Line>厂商:{notEmpty(item.mfr)}</Line>
                                        <Line>设备类型:{notEmpty(item.deviceModel)}</Line>
                                        <Line>ISDM位号:{notEmpty(item.isdmTag)}</Line>
                                        <Line>工厂模型:{notEmpty(item.areaName)}</Line>
                                        <Line>报警事件描述:{notEmpty(item.alarmName)}</Line>
                                        <Line>报警建议:{notEmpty(item.alarmSuggestion)}</Line>
                                        <Line>确认消息:{notEmpty(item.message)}</Line>
                                    </Collapse>
                                </TableLike>
                            </div>
                        ),
                    }),
                ]}
            />
        </Header>
    );
};

export default Device;
