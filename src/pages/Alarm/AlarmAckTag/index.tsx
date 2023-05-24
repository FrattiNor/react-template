import useConst from '@/hooks/useConst';
import styles from './index.module.less';
import notEmpty from '@/utils/notEmpty';
import { FC, Fragment } from 'react';

type Props = {
    isAcked: number;
};

const AlarmAckTag: FC<Props> = ({ isAcked }) => {
    const { ALARM_CONFIRM_COLOR_MAP, ALARM_CONFIRM_MAP } = useConst();

    return (
        <Fragment>
            {notEmpty(isAcked, () => (
                <div className={styles['level-tag']} style={{ backgroundColor: ALARM_CONFIRM_COLOR_MAP.get(isAcked) }}>
                    {notEmpty(ALARM_CONFIRM_MAP.get(isAcked))}
                </div>
            ))}
        </Fragment>
    );
};

export default AlarmAckTag;
