import type { CSSProperties } from 'react';
import { Fragment, useEffect, useRef } from 'react';

import { useMergeState, useTransition } from '@react/hooks';
import classNames from 'classnames';

import styles from './index.module.less';

import type { SegmentedProps } from './type';

const Segmented = <T extends string>(props: SegmentedProps<T>) => {
    const { options = [], bordered, className, style, onMouseDown } = props;

    const maskStyle = useRef<CSSProperties>();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [value, onChange] = useMergeState<T>({
        defaultValue: () => options?.[0]?.value as T,
        state: props.value,
        setState: props.onChange,
    });

    const { listeners, start } = useTransition({
        beforeTransition() {
            if (wrapperRef.current) {
                const valueIndex = options.findIndex((item) => item.value === value);
                if (valueIndex > -1) {
                    const node = wrapperRef.current.childNodes[valueIndex];
                    if (node) {
                        const top = (node as HTMLDivElement).offsetTop;
                        const left = (node as HTMLDivElement).offsetLeft;
                        const width = (node as HTMLDivElement).clientWidth;
                        const height = (node as HTMLDivElement).clientHeight;
                        const transition = maskStyle.current === undefined ? 'none' : 'all 0.2s'; // 第一次不设置transition
                        maskStyle.current = { top, left, width, height, transition };
                    }
                }
            }
        },
    });

    const itemClick = (itemValue: T) => {
        if (itemValue !== value) {
            if (typeof onChange === 'function') {
                onChange(itemValue);
            }
        }
    };

    useEffect(() => {
        requestIdleCallback(() => {
            start();
        });
    }, [value, JSON.stringify(options)]);

    return (
        <Fragment>
            {options.length > 0 && (
                <div
                    style={style}
                    ref={wrapperRef}
                    onMouseDown={onMouseDown}
                    className={classNames(styles['wrapper'], className, { [styles['bordered']]: bordered === true })}
                >
                    {options.map((item) => (
                        <div
                            key={item.value}
                            onClick={() => itemClick(item.value as T)}
                            className={classNames(styles['item'], {
                                [styles['selected']]: value === item.value,
                                [styles['not-selected']]: value !== item.value,
                            })}
                        >
                            {item.label}
                        </div>
                    ))}
                    <div {...listeners} style={maskStyle.current} className={styles['mask']} />
                </div>
            )}
        </Fragment>
    );
};

export default Segmented;
