import { useCardInfo } from '@/services/cabinet';
import styles from './index.module.less';
import { FC } from 'react';

type Props = {
    title: string;
    activeId: string;
};

const Info: FC<Props> = ({ title, activeId }) => {
    const { data } = useCardInfo(activeId);

    return activeId ? (
        <div className={styles['info']}>
            <div className={styles['title']}>{title}</div>
            <div className={styles['table-title']}>
                <div className={styles['key']}>诊断项</div>
                <div className={styles['value']}>诊断结果</div>
            </div>
            <div className={styles['table']}>
                {data?.map((item) => {
                    return (
                        <div className={styles['line']} key={item.layoutId}>
                            <div className={styles['key']}>{item.itemName}</div>
                            <div className={styles['value']}>
                                {item.diagStatus !== 0 && <div className={styles['error']} />}
                                {item.itemValue}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    ) : null;
};

export default Info;
