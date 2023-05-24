import useConst from '@/hooks/useConst';
import styles from './index.module.less';
import notEmpty from '@/utils/notEmpty';
import { FC, Fragment } from 'react';

type Props = {
    level: number;
};

const AlarmLevelTag: FC<Props> = ({ level }) => {
    const { ALARM_LEVEL_COLOR_MAP, ALARM_LEVEL_MAP } = useConst();

    return (
        <Fragment>
            {notEmpty(level, () => (
                <div className={styles['level-tag']} style={{ backgroundColor: ALARM_LEVEL_COLOR_MAP.get(level) }}>
                    {notEmpty(ALARM_LEVEL_MAP.get(level))}
                </div>
            ))}
        </Fragment>
    );
};

export default AlarmLevelTag;
