import KeyValueTable, { KeyValueProvider, Tr } from '@/components/KeyValueTable';
import { useNavigate } from 'react-router-dom';
import { DeviceItem } from '@/services/device';
import Collapse from '@/components/Collapse';
import styles from './index.module.less';
import timeTool from '@/utils/timeTool';
import notEmpty from '@/utils/notEmpty';
import useConst from '@/hooks/useConst';
import { Button } from 'antd-mobile';
import { useCallback } from 'react';

const useRender = () => {
    const navigate = useNavigate();
    const { DEVICE_CATEGORY_MAP, DEVICE_ORIGIN_MAP } = useConst();

    const renderDetailBtn = useCallback(
        (id: string) => (
            <Button block size="small" color="primary" className={styles['btn']} onClick={() => navigate(`/device/${id}`)}>
                详情
            </Button>
        ),
        [],
    );

    const renderMeterItem = useCallback(
        (item: DeviceItem, { visible }: { visible: boolean }) => (
            <div className={styles['item']}>
                <KeyValueProvider widthClassNames={[styles['key']]}>
                    <KeyValueTable>
                        <Tr>ISDM位号:{notEmpty(item.isdmTag)}</Tr>
                        <Tr>设备类型:{notEmpty(item.deviceModel)}</Tr>
                        <Tr>厂商:{notEmpty(item.mfrName)}</Tr>
                    </KeyValueTable>
                    <Collapse visible={visible}>
                        <KeyValueTable>
                            <Tr>类别:{notEmpty(DEVICE_CATEGORY_MAP.get(item.category))}</Tr>
                            <Tr>仪表位号:{notEmpty(item.deviceTag)}</Tr>
                            <Tr>系统位号:{notEmpty(item.systemTag)}</Tr>
                            <Tr>设备身份码:{notEmpty(item.identifier)}</Tr>
                            <Tr>协议:{notEmpty(item.protocol)}</Tr>
                            <Tr>设备来源:{notEmpty(DEVICE_ORIGIN_MAP.get(item.sourceType))}</Tr>
                            <Tr>模式状态:{notEmpty(item.devMode)}</Tr>
                            <Tr>累计运行时间:{notEmpty(item.wkDay, () => `${item.wkDay}天`)}</Tr>
                            <Tr>最近上线时间:{notEmpty(item.onlineTime, () => timeTool.toStrByNum(item.onlineTime))}</Tr>
                            <Tr>工厂模型:{notEmpty(item.areaRef)}</Tr>
                        </KeyValueTable>
                        {renderDetailBtn(item.id)}
                    </Collapse>
                </KeyValueProvider>
            </div>
        ),
        [],
    );

    const renderCardItem = useCallback(
        (item: DeviceItem, { visible }: { visible: boolean }) => (
            <KeyValueProvider widthClassNames={[styles['key']]}>
                <div className={styles['item']}>
                    <KeyValueTable>
                        <Tr>ISDM位号:{notEmpty(item.isdmTag)}</Tr>
                        <Tr>设备类型:{notEmpty(item.deviceModel)}</Tr>
                        <Tr>类别:{notEmpty(DEVICE_CATEGORY_MAP.get(item.category))}</Tr>
                    </KeyValueTable>
                    <Collapse visible={visible}>
                        <KeyValueTable>
                            <Tr>厂商:{notEmpty(item.mfrName)}</Tr>
                            <Tr>设备身份码:{notEmpty(item.identifier)}</Tr>
                            <Tr>设备来源:{notEmpty(DEVICE_ORIGIN_MAP.get(item.sourceType))}</Tr>
                            <Tr>模式状态:{notEmpty(item.devMode)}</Tr>
                            <Tr>累计运行时间:{notEmpty(item.wkDay, () => `${item.wkDay}天`)}</Tr>
                            <Tr>最近上线时间:{notEmpty(item.onlineTime, () => timeTool.toStrByNum(item.onlineTime))}</Tr>
                            <Tr>工厂模型:{notEmpty(item.areaRef)}</Tr>
                        </KeyValueTable>
                        {renderDetailBtn(item.id)}
                    </Collapse>
                </div>
            </KeyValueProvider>
        ),
        [],
    );

    return { renderMeterItem, renderCardItem };
};

export default useRender;
