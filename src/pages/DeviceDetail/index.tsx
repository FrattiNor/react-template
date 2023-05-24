import { useDeviceDetailInfo } from '@/services/deviceDetail';
import { useParams } from 'react-router-dom';
import Collapse from '@/components/Collapse';
import Iconfont from '@/components/Iconfont';
import Header from '@/components/Header';
import styles from './index.module.less';
import notEmpty from '@/utils/notEmpty';
import useInfoMap from './useInfoMap';
import classNames from 'classnames';
import { useState } from 'react';
import Detail from './Detail';

const DeviceDetail = () => {
    const [visible, setVisible] = useState(false);
    const { deviceId } = useParams<{ deviceId: string }>();
    const { data } = useDeviceDetailInfo(deviceId);
    const { isdmTag, areaRef } = data || {};
    const infoMap = useInfoMap(data);

    return (
        <Header back>
            <div className={styles['wrapper']}>
                <div className={styles['info']}>
                    <div className={styles['title']} onClick={() => setVisible((v) => !v)}>
                        <div className={styles['text']}> {notEmpty(isdmTag)}</div>
                        <Iconfont icon="arrow-down-2" className={classNames(styles['icon'], { [styles['show']]: visible })} />
                    </div>
                    <Collapse visible={visible}>
                        <div className={styles['info-content']}>
                            <div className={styles['item']} style={{ width: '100%' }}>
                                <div className={styles['key']}>{`工厂模型: `}</div>
                                <div className={styles['value']}>{notEmpty(areaRef)}</div>
                            </div>
                            {Object.entries(infoMap).map(([key, value]) => (
                                <div key={key} className={styles['item']}>
                                    <div className={styles['key']}>{`${key}: `}</div>
                                    <div className={styles['value']}>{value}</div>
                                </div>
                            ))}
                        </div>
                    </Collapse>
                </div>
                <div className={styles['detail']}>
                    <Detail />
                </div>
            </div>
        </Header>
    );
};

export default DeviceDetail;
