import { FC, useEffect, useReducer, useRef, useState } from 'react';
import { NotificationRenderQueenItem } from '../../type';
import styles from './index.module.less';
import classNames from 'classnames';
import CloseSvg from './closeSvg';

type Status = 'enter' | 'default' | 'leave';

const Item: FC<{ props: NotificationRenderQueenItem }> = ({ props }) => {
    const statusRef = useRef<Status>('enter');
    const itemRef = useRef<HTMLDivElement>(null);
    const heightRef = useRef<number | 'auto'>('auto');

    const [hover, setHover] = useState(false);
    const rerender = useReducer(() => ({}), {})[1];
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const { message, duration, dispose, placement } = props;

    const onAnimationEnd = () => {
        if (statusRef.current === 'enter') {
            statusRef.current = 'default';
            rerender();
        }
        if (statusRef.current === 'leave') {
            dispose();
        }
    };

    const close = () => {
        if (itemRef.current) heightRef.current = itemRef.current.clientHeight;
        statusRef.current = 'leave';
        rerender();
    };

    useEffect(() => {
        if (!hover && typeof duration === 'number' && duration > 0) {
            timeout.current = setTimeout(() => {
                close();
            }, duration);

            return () => {
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
            };
        }
    }, [duration, hover]);

    return (
        <div
            onAnimationEnd={onAnimationEnd}
            style={{ height: heightRef.current }}
            className={classNames(styles['item-wrapper'], {
                [styles['top']]: placement.includes('top'),
                [styles['left']]: placement.includes('Left'),
                [styles['right']]: placement.includes('Right'),
                [styles['bottom']]: placement.includes('bottom'),
                [styles['enter']]: statusRef.current === 'enter',
                [styles['leave']]: statusRef.current === 'leave',
            })}
        >
            <div ref={itemRef} className={styles['item']} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <div className={styles['message']}>{message}</div>
                <div className={styles['close-x']} onClick={close}>
                    <CloseSvg />
                </div>
            </div>
        </div>
    );
};

export default Item;
