import { DropdownPlacement } from '../../type';

type TopBottom = 'top' | 'bottom';

type LeftRight = 'left' | 'right';

export type Position = {
    x: number;
    y: number;
    topBottom: TopBottom;
};

type Opt = {
    target: HTMLElement;
    overlay: HTMLElement;
    container: HTMLElement;
    placement: DropdownPlacement;
};

const usePosition = () => {
    const getPosition = (opt: Opt): Position => {
        const { placement, target, container, overlay } = opt;

        let topBottom: TopBottom = placement.includes('top') ? 'top' : 'bottom';
        let leftRight: LeftRight = placement.includes('Left') ? 'left' : 'right';

        const targetRect = target.getBoundingClientRect();
        const overlayRect = overlay.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const distanceTop = targetRect.y - containerRect.y; // 触发器距离容器顶部距离
        const distanceBottom = containerRect.height - (targetRect.y - containerRect.y + targetRect.height); // 触发器距离容器底部距离
        const distanceLeft = targetRect.x - containerRect.x; // 触发器距离容器左侧距离
        const distanceRight = containerRect.width - (targetRect.x - containerRect.x + targetRect.width); // 触发器距离容器右侧距离
        const overlayHeight = overlayRect.height; // 弹出层高度
        const overlayOverflowWidth = overlayRect.width - targetRect.width; // 弹出层溢出宽度

        // 当只满足一项时，切换方向;
        if (overlayHeight > distanceBottom && overlayHeight <= distanceTop) topBottom = 'top';
        if (overlayHeight > distanceTop && overlayHeight <= distanceBottom) topBottom = 'bottom';
        if (overlayOverflowWidth > distanceLeft && overlayOverflowWidth <= distanceRight) leftRight = 'left';
        if (overlayOverflowWidth > distanceRight && overlayOverflowWidth <= distanceLeft) leftRight = 'right';

        const offsetY =
            topBottom === 'top' ? targetRect.y - containerRect.y - overlayRect.height : targetRect.y - containerRect.y + targetRect.height;

        const offsetX = leftRight === 'left' ? targetRect.x - containerRect.x : targetRect.x - containerRect.x - overlayOverflowWidth;

        return { x: offsetX, y: offsetY, topBottom };
    };

    return getPosition;
};

export default usePosition;
