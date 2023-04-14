import { useEffect, useRef, useState } from 'react';
import useResizeObserver from './useResizeObserver';
import FabricInstance from './instance';
import { fabric } from 'fabric';
import styles from './app.less';

const App = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [fabricI, setFabricI] = useState<FabricInstance | null>(null);

    useResizeObserver(ref.current, ({ width, height }) => {
        if (fabricI) fabricI.instance.setDimensions({ width, height });
    });

    useEffect(() => {
        const i = new FabricInstance(
            new fabric.Canvas('c', {
                stopContextMenu: true, // 禁止默认右键菜单
                // fireRightClick: true, // 启用右键，button的数字为3
                controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
                preserveObjectStacking: true, // 元素对象被选中时保持在当前z轴，不会跳到最顶层
            }),
        );

        const instance = i.instance;
        const drag = i.drag;

        // 滚轮缩放
        (() => {
            // 鼠标滚轮时触发
            instance.on('mouse:wheel', (opt) => {
                const delta = opt.e.deltaY; // 滚轮，向上滚一下是 -100，向下滚一下是 100
                let zoom = instance.getZoom(); // 获取画布当前缩放值
                zoom *= 0.999 ** delta; // 计算滚动后的缩放值
                if (zoom > 20) zoom = 20; // 限制最大缩放级别
                if (zoom < 0.01) zoom = 0.01; // 限制最小缩放级别
                instance.zoomToPoint(
                    { x: opt.e.offsetX, y: opt.e.offsetY }, // 关键点
                    zoom, // 传入修改后的缩放级别
                ); // 设置缩放值
            });
        })();

        // 画布拖拽
        (() => {
            // 鼠标按下时触发
            instance.on('mouse:down', (opt) => {
                if (opt.e.altKey === true) {
                    drag.isDragging = true;
                    drag.lastX = opt.e.clientX;
                    drag.lastY = opt.e.clientY;
                }
            });
            // 鼠标移动时触发
            instance.on('mouse:move', (opt) => {
                if (drag.isDragging) {
                    const vpt = instance.viewportTransform;
                    if (vpt) {
                        const e = opt.e;
                        instance.selection = false;
                        vpt[4] += e.clientX - drag.lastX;
                        vpt[5] += e.clientY - drag.lastY;
                        instance.requestRenderAll();
                        drag.lastX = e.clientX;
                        drag.lastY = e.clientY;
                    }
                }
            });
            // 鼠标松开时触发
            instance.on('mouse:up', () => {
                if (instance.viewportTransform) {
                    instance.setViewportTransform(instance.viewportTransform); // 设置此画布实例的视口转换
                    drag.isDragging = false;
                }
            });
        })();

        (() => {
            instance.add(
                new fabric.Rect({
                    top: 0,
                    left: 0,
                    width: instance.width,
                    height: instance.height,
                    stroke: 'blue',
                    fill: 'transparent',
                    strokeWidth: 20,
                }),
            );
        })();

        setFabricI(i);

        return () => {
            instance.dispose();
        };
    }, []);

    // 创建一个长方形
    const rect = ({ top, left }: { top?: number; left?: number }) =>
        new fabric.Rect({
            top: top || 30, // 距离容器顶部 30px
            left: left || 30, // 距离容器左侧 30px
            width: 100, // 宽 100px
            height: 60, // 高 60px
            fill: 'red', // 填充 红色
        });

    const circle = ({ top, left }: { top?: number; left?: number }) =>
        new fabric.Circle({
            radius: 30, // 圆的半径
            top: top || 20, // 距离容器顶部 20px
            left: left || 20, // 距离容器左侧 20px
            fill: 'pink', // 填充 粉色
        });

    return (
        <div className={styles['wrapper']}>
            <div className={styles['left']}>
                <div className={styles['box']}>
                    <div className={styles['title']}>元素</div>
                    <div className={styles['content']}>
                        <div className={styles['item']}>{}</div>
                        <div className={styles['item']}>{}</div>
                        <div className={styles['item']} onClick={() => fabricI?.instance.add(rect({}))} />
                        <div className={styles['item']} onClick={() => fabricI?.instance.add(circle({}))} />
                    </div>
                </div>
            </div>
            <div className={styles['center']} ref={ref}>
                <canvas id="c" className={styles['canvas']} />
            </div>
            <div className={styles['right']} />
        </div>
    );
};

export default App;
