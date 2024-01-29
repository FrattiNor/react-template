import { CSSProperties, FC, useLayoutEffect, useRef } from 'react';
import { useMergeState, useTransition } from '@react/hooks';
import styles from './index.module.less';
import { SegmentedProps } from './type';
import classNames from 'classnames';

const Segmented: FC<SegmentedProps> = (props) => {
    const { options = [], bordered } = props;
    const maskStyle = useRef<CSSProperties>();
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [value, onChange] = useMergeState({
        defaultValue: () => options[0].value,
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
                        maskStyle.current = { top, left, width, height };
                    }
                }
            }
        },
    });

    const itemClick = (itemValue: string) => {
        if (itemValue !== value) {
            if (typeof onChange === 'function') {
                onChange(itemValue);
            }
        }
    };

    useLayoutEffect(() => {
        start();
    }, [value, JSON.stringify(options)]);

    return (
        <div className={classNames(styles['wrapper'], { [styles['bordered']]: bordered === true })} ref={wrapperRef}>
            {options.map((item) => (
                <div
                    key={item.value}
                    onClick={() => itemClick(item.value)}
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
    );
};

export default Segmented;
