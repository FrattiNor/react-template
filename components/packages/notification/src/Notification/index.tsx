import { NotificationRenderQueenItem } from '../type';
import styles from './index.module.less';
import { useTheme } from '@pkg/theme';
import classNames from 'classnames';
import { FC } from 'react';
import Item from './Item';

type Props = {
    zIndex: number;
    maxCount: number;
    queen: Record<string, NotificationRenderQueenItem>;
};

const Notification: FC<Props> = ({ queen, zIndex }) => {
    const { theme, themeClassName, applyClassName } = useTheme();

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
        <div className={classNames(styles['notification'], styles[theme], themeClassName, applyClassName)} style={{ zIndex }}>
            {topLeft.length > 0 && (
                <div className={styles['top-left']}>
                    {topLeft.map((item) => (
                        <Item key={item.key} props={item} />
                    ))}
                </div>
            )}
            {topRight.length > 0 && (
                <div className={styles['top-right']}>
                    {topRight.map((item) => (
                        <Item key={item.key} props={item} />
                    ))}
                </div>
            )}
            {bottomLeft.length > 0 && (
                <div className={styles['bottom-left']}>
                    {bottomLeft.map((item) => (
                        <Item key={item.key} props={item} />
                    ))}
                </div>
            )}
            {bottomRight.length > 0 && (
                <div className={styles['bottom-right']}>
                    {bottomRight.map((item) => (
                        <Item key={item.key} props={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notification;
