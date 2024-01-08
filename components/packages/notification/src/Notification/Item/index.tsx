import { FC, useEffect, useReducer, useRef, useState } from 'react';
import { NotificationRenderQueenItem } from '../../type';
import styles from './index.module.less';
import classNames from 'classnames';
import CloseSvg from './CloseSvg';

type Status = 'beforeEnter' | 'enter' | 'beforeLeave' | 'leave';

type Props = {
    first: boolean; // 第一条
    item: NotificationRenderQueenItem;
};

const Item: FC<Props> = ({ item, first }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef<Status>('beforeEnter');
    const heightRef = useRef<number | undefined>(undefined);

    const [hover, setHover] = useState(false);
    const rerender = useReducer(() => ({}), {})[1];
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const { message, duration, dispose, placement } = item;

    const onAnimationEnd = () => {
        if (statusRef.current === 'enter') {
            statusRef.current = 'beforeLeave';
            heightRef.current = undefined;
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
        if (itemRef.current) {
            heightRef.current = itemRef.current.clientHeight;
            statusRef.current = 'enter';
            rerender();
        }
    }, []);

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
                [styles['first']]: first,
                [styles['top']]: placement.includes('top'),
                [styles['left']]: placement.includes('Left'),
                [styles['right']]: placement.includes('Right'),
                [styles['bottom']]: placement.includes('bottom'),
                [styles['enter']]: statusRef.current === 'enter',
                [styles['leave']]: statusRef.current === 'leave',
                [styles['before-enter']]: statusRef.current === 'beforeEnter',
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
