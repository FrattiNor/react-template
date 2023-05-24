import { createInfiniteListItem } from '@/components/InfiniteLists/utils';
import TableLike, { Line } from '@/components/TableLike';
import InfiniteLists from '@/components/InfiniteLists';
import { useDeviceList } from '@/services/device';
import { useNavigate } from 'react-router-dom';
import Collapse from '@/components/Collapse';
import Header from '@/components/Header';
import styles from './index.module.less';
import timeTool from '@/utils/timeTool';
import notEmpty from '@/utils/notEmpty';
import useConst from '@/hooks/useConst';
import useFilters from './useFilters';
import { Button } from 'antd-mobile';

const Device = () => {
    const filterList = useFilters();
    const queryCard = useDeviceList(2);
    const queryMeter = useDeviceList(1);
    const { DEVICE_CATEGORY_MAP, DEVICE_ORIGIN_MAP } = useConst();
    const navigate = useNavigate();

    return (
        <Header boxShadow={false}>
            <InfiniteLists
                items={[
                    createInfiniteListItem({
                        title: '仪表',
                        rowKey: 'id',
                        query: queryMeter,
                        enableVisible: true,
                        filter: { filterList },
                        renderItem: (item, { visible }) => (
                            <div className={styles['item']}>
                                <TableLike className={{ 0: styles['key'], 1: styles['value'] }}>
                                    <Line>ISDM位号:{notEmpty(item.isdmTag)}</Line>
                                    <Line>设备类型:{notEmpty(item.deviceModel)}</Line>
                                    <Line>厂商:{notEmpty(item.mfrName)}</Line>
                                    <Collapse visible={visible}>
                                        <Line>类别:{notEmpty(DEVICE_CATEGORY_MAP.get(item.category))}</Line>
                                        <Line>仪表位号:{notEmpty(item.deviceTag)}</Line>
                                        <Line>系统位号:{notEmpty(item.systemTag)}</Line>
                                        <Line>设备身份码:{notEmpty(item.identifier)}</Line>
                                        <Line>协议:{notEmpty(item.protocol)}</Line>
                                        <Line>设备来源:{notEmpty(DEVICE_ORIGIN_MAP.get(item.sourceType))}</Line>
                                        <Line>模式状态:{notEmpty(item.devMode)}</Line>
                                        <Line>累计运行时间:{notEmpty(item.wkDay, () => `${item.wkDay}天`)}</Line>
                                        <Line>最近上线时间:{notEmpty(item.onlineTime, () => timeTool.toStrByNum(item.onlineTime))}</Line>
                                        <Line>工厂模型:{notEmpty(item.areaRef)}</Line>
                                        <Button
                                            block
                                            size="small"
                                            color="primary"
                                            className={styles['btn']}
                                            onClick={() => navigate(`/device/${item.id}`)}
                                        >
                                            详情
                                        </Button>
                                    </Collapse>
                                </TableLike>
                            </div>
                        ),
                    }),
                    createInfiniteListItem({
                        title: '卡件',
                        rowKey: 'id',
                        query: queryCard,
                        enableVisible: true,
                        filter: { filterList },
                        renderItem: (item, { visible }) => (
                            <div className={styles['item']}>
                                <TableLike className={{ 0: styles['key'], 1: styles['value'] }}>
                                    <Line>ISDM位号:{notEmpty(item.isdmTag)}</Line>
                                    <Line>设备类型:{notEmpty(item.deviceModel)}</Line>
                                    <Line>类别:{notEmpty(DEVICE_CATEGORY_MAP.get(item.category))}</Line>
                                    <Collapse visible={visible}>
                                        <Line>厂商:{notEmpty(item.mfrName)}</Line>
                                        <Line>设备身份码:{notEmpty(item.identifier)}</Line>
                                        <Line>设备来源:{notEmpty(DEVICE_ORIGIN_MAP.get(item.sourceType))}</Line>
                                        <Line>模式状态:{notEmpty(item.devMode)}</Line>
                                        <Line>累计运行时间:{notEmpty(item.wkDay, () => `${item.wkDay}天`)}</Line>
                                        <Line>最近上线时间:{notEmpty(item.onlineTime, () => timeTool.toStrByNum(item.onlineTime))}</Line>
                                        <Line>工厂模型:{notEmpty(item.areaRef)}</Line>
                                        <Button
                                            block
                                            size="small"
                                            color="primary"
                                            className={styles['btn']}
                                            onClick={() => navigate(`/device/${item.id}`)}
                                        >
                                            详情
                                        </Button>
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
