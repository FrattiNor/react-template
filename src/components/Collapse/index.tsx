import { FC, useEffect, useRef, useState } from 'react';
import { easeInOut } from '@/utils/jsAnimate/timing';
import JsAnimate from '@/utils/jsAnimate';
import { Props } from './type';

const Collapse: FC<Props> = ({ children, visible }) => {
    const currentVisible = useRef(visible);
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | 'auto'>(visible ? 'auto' : 0);

    useEffect(() => {
        if (visible !== currentVisible.current) {
            currentVisible.current = visible;

            if (ref.current) {
                const totalHeight = ref.current.clientHeight; // 总高度
                const prevHeight = height === 'auto' ? totalHeight : height; // 之前的高度【可能执行完了，可能没执行完】
                const nextHeight = visible ? totalHeight : 0; // 接下来要变成的高度
                const animateHeight = Math.abs(nextHeight - prevHeight); // 需要执行动画的高度
                const percentage = animateHeight / totalHeight; // 执行动画的高度在总高度的占比
                const duration = 250 * percentage; // 根据占比计算动画执行时间
                const draw = (p: number) => {
                    // 执行动画函数，打开动画最终变成auto，其余按number执行
                    setHeight(visible && p === 1 ? 'auto' : prevHeight + (visible ? animateHeight * p : -animateHeight * p));
                };
                // 创建动画对象auto执行
                const animate = new JsAnimate({ draw, duration, timing: easeInOut });
                // 执行中间被打断，中止
                return () => animate.destroy();
            }
        }
    }, [visible]);

    return (
        <div style={{ overflow: 'hidden', height }}>
            <div ref={ref}>{children}</div>
        </div>
    );
};

export default Collapse;
