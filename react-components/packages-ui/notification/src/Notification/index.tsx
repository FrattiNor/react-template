import { FC } from 'react';

import { useTheme } from '@pkg/theme';
import classNames from 'classnames';

import styles from './index.module.less';
import Item from './Item';
import { NotificationRenderQueenItem } from '../type';

type Props = {
    zIndex: number;
    maxCount: number;
    queen: Record<string, NotificationRenderQueenItem>;
};

const Notification: FC<Props> = ({ queen, zIndex }) => {
    const { theme, themeClassName, applyTheme } = useTheme();

    const topLeft: NotificationRenderQueenItem[] = [];
    const topRight: NotificationRenderQueenItem[] = [];
    const bottomLeft: NotificationRenderQueenItem[] = [];
    const bottomRight: NotificationRenderQueenItem[] = [];

    Object.values(queen).forEach((item) => {
        switch (item.placement) {
            case 'topLeft':
                topLeft.push(item);
                break;
            case 'topRight':
                topRight.push(item);
                break;
            case 'bottomLeft':
                bottomLeft.push(item);
                break;
            case 'bottomRight':
                bottomRight.push(item);
                break;
            default:
                break;
        }
    });

    return (
        <div className={classNames(styles['notification'], styles[theme], themeClassName, applyTheme)} style={{ zIndex }}>
            {topLeft.length > 0 && (
                <div className={styles['top-left']}>
                    {[...topLeft].reverse().map((item, index) => (
                        <Item key={item.key} item={item} first={index === topLeft.length - 1} />
                    ))}
                </div>
            )}
            {topRight.length > 0 && (
                <div className={styles['top-right']}>
                    {[...topRight].reverse().map((item, index) => (
                        <Item key={item.key} item={item} first={index === topRight.length - 1} />
                    ))}
                </div>
            )}
            {bottomLeft.length > 0 && (
                <div className={styles['bottom-left']}>
                    {bottomLeft.map((item, index) => (
                        <Item key={item.key} item={item} first={index === 0} />
                    ))}
                </div>
            )}
            {bottomRight.length > 0 && (
                <div className={styles['bottom-right']}>
                    {bottomRight.map((item, index) => (
                        <Item key={item.key} item={item} first={index === 0} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notification;
