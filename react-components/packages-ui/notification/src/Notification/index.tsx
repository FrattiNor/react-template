import { FC, useEffect, useState } from 'react';

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
    const [windowFocus, setWindowFocus] = useState(true);
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

    useEffect(() => {
        const visibilitychange = () => {
            setWindowFocus(!document.hidden);
        };

        document.addEventListener('visibilitychange', visibilitychange);

        return () => {
            document.removeEventListener('visibilitychange', visibilitychange);
        };
    }, []);

    return (
        <div className={classNames(styles['notification'], styles[theme], themeClassName, applyTheme)} style={{ zIndex }}>
            {topLeft.length > 0 && (
                <div className={styles['top-left']}>
                    {topLeft.map((item, index) => (
                        <Item key={item.key} item={item} windowFocus={windowFocus} last={index === topLeft.length - 1} />
                    ))}
                </div>
            )}
            {topRight.length > 0 && (
                <div className={styles['top-right']}>
                    {topRight.map((item, index) => (
                        <Item key={item.key} item={item} windowFocus={windowFocus} last={index === topRight.length - 1} />
                    ))}
                </div>
            )}
            {bottomLeft.length > 0 && (
                <div className={styles['bottom-left']}>
                    {[...bottomLeft].reverse().map((item, index) => (
                        <Item key={item.key} item={item} windowFocus={windowFocus} last={index === 0} />
                    ))}
                </div>
            )}
            {bottomRight.length > 0 && (
                <div className={styles['bottom-right']}>
                    {[...bottomRight].reverse().map((item, index) => (
                        <Item key={item.key} item={item} windowFocus={windowFocus} last={index === 0} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notification;
