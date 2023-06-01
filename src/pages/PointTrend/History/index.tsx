import useFullScreen from '../FullScreen';
import Filter from '@/components/Filter';
import styles from './index.module.less';
import useFilter from './useFilter';
import { Popup } from 'antd-mobile';
import Content from './content';
import Switch from '../Switch';
import { Props } from './type';
import { FC } from 'react';

const History: FC<Props> = ({ historyData }) => {
    const filter = useFilter();
    const { params, addAndDelParams } = historyData;
    const { fullScreenBtn, full, closeFull } = useFullScreen();

    return (
        <div className={styles['wrapper']}>
            {!full && (
                <Content historyData={historyData}>
                    {fullScreenBtn}
                    <Switch />
                    <Filter filterList={filter} params={params} addAndDelParams={addAndDelParams} />
                </Content>
            )}

            <Popup visible={full} bodyClassName={styles['popup']} position="left" onClose={closeFull} showCloseButton destroyOnClose>
                {full && <Content historyData={historyData} />}
            </Popup>
        </div>
    );
};

export default History;
