import { Dispatch, PropsWithChildren, ReactNode } from 'react';

export type DropdownPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type DropdownItem = {
    key: string;
    label: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => boolean | void;
};

export type DropdownProps = PropsWithChildren<{
    items: DropdownItem[]; // overlay 渲染内容
    overlayFollow?: boolean; // overlay 自动跟踪
    overlaySameWidth?: boolean; // overlay和target同宽（最小宽度）
    placement?: DropdownPlacement; // overlay弹出位置
    getContainer?: () => HTMLElement | undefined; // 渲染overlay的容器
    visible?: boolean;
    onVisibleChange?: Dispatch<boolean>;
}>;

export type OverlayProps = {
    target: HTMLElement; // target 元素
    items: DropdownItem[]; // overlay 渲染内容
    container: HTMLElement; // 容器 元素
    overlaySameWidth?: boolean; // overlay和target同宽（最小宽度）
    placement: DropdownPlacement; // overlay弹出位置
    overlayFollow?: boolean; // overlay 自动跟踪
    afterClose?: () => void; // 结束动画完成回调
    visible: boolean;
    setVisible: Dispatch<boolean>;
};

export type OverlayRef = {
    close: () => void;
};

export type OverlayComponent = (props: OverlayProps & React.RefAttributes<OverlayRef>) => ReactNode | null;
