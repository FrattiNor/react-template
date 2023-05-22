import { createInfiniteListItem } from '@/components/InfiniteLists/utils';
import InfiniteLists from '@/components/InfiniteLists';
import { useDeviceList } from '@/services/device';
import Collapse from '@/components/Collapse';
import Header from '@/components/Header';
import styles from './index.module.less';
import useFilters from './useFilters';

const Device = () => {
    const filterList = useFilters();
    const queryCard = useDeviceList(2);
    const queryMeter = useDeviceList(1);

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
                                <div>ISDM位号:{item.isdmTag}</div>
                                <div>设备类型:{item.deviceModel}</div>
                                <div>厂商:{item.mfrName}</div>
                                <Collapse visible={visible}>
                                    <div>类别:{item.category}</div>
                                    <div>仪表位号:{item.deviceTag}</div>
                                    <div>系统位号:{item.systemTag}</div>
                                    <div>设备身份码:{item.identifier}</div>
                                    <div>协议:{item.protocol}</div>
                                    <div>设备来源:{item.sourceType}</div>
                                    <div>模式状态:{item.devMode}</div>
                                    <div>累计运行时间:{item.wkDay}</div>
                                    <div>最近上线时间:{item.onlineTime}</div>
                                    <div>工厂模型:{item.areaRef}</div>
                                </Collapse>
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
                                <div>ISDM位号:{item.isdmTag}</div>
                                <div>设备类型:{item.deviceModel}</div>
                                <div>类别:{item.category}</div>
                                <Collapse visible={visible}>
                                    <div>厂商:{item.mfrName}</div>
                                    <div>设备身份码:{item.identifier}</div>
                                    <div>设备来源:{item.sourceType}</div>
                                    <div>模式状态:{item.devMode}</div>
                                    <div>累计运行时间:{item.wkDay}</div>
                                    <div>最近上线时间:{item.onlineTime}</div>
                                    <div>工厂模型:{item.areaRef}</div>
                                </Collapse>
                            </div>
                        ),
                    }),
                ]}
            />
        </Header>
    );
};

export default Device;
