import KeyValueTable, { Tr } from '@/components/KeyValueTable';
import { useDeviceDetailInfo } from '@/services/deviceDetail';
import { useParams } from 'react-router-dom';
import Collapse from '@/components/Collapse';
import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import notEmpty from '@/utils/notEmpty';
import DetailList from './DetailList';
import useInfoMap from './useInfoMap';
import classNames from 'classnames';
import { useState } from 'react';

const DeviceDetail = () => {
    const { deviceId } = useParams<{ deviceId: string }>();
    const [visible, setVisible] = useState(false);
    const { data } = useDeviceDetailInfo(deviceId);
    const { isdmTag, areaRef } = data || {};
    const infoMap = useInfoMap(data);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['info']}>
                <div className={styles['title']} onClick={() => setVisible((v) => !v)}>
                    <div className={styles['text']}> {notEmpty(isdmTag)}</div>
                    <Iconfont icon="arrow-down-2" className={classNames(styles['icon'], { [styles['show']]: visible })} />
                </div>
                <Collapse visible={visible}>
                    <KeyValueTable widthClassNames={[styles['key']]}>
                        <Tr>工厂模型:{notEmpty(areaRef)}</Tr>
                    </KeyValueTable>
                    <KeyValueTable widthClassNames={[styles['key'], styles['value'], styles['key2']]}>
                        {infoMap.map((line, i) => (
                            <Tr key={i}>{line}</Tr>
                        ))}
                    </KeyValueTable>
                </Collapse>
            </div>
            <div className={styles['detail']}>
                <DetailList deviceId={deviceId} isdmTag={isdmTag} />
            </div>
        </div>
    );
};

export default DeviceDetail;
