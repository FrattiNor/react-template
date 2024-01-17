import { PropsWithChildren } from 'react';
import { Theme } from '@pkg/theme';

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
}>;

export type OverlayProps = {
    theme: Theme; // 主题
    visible: boolean; // 可见
    targetWidth: number; // target 宽度
    target: HTMLElement; // target 元素
    destroy: () => void; // 销毁
    items: DropdownItem[]; // overlay 渲染内容
    themeClassName: string; // 主题类
    applyClassName: string; // 主题应用类
    container: HTMLElement; // 容器 元素
    overlaySameWidth?: boolean; // overlay和target同宽（最小宽度）
    placement: DropdownPlacement; // overlay弹出位置
    overlayFollow?: boolean; // overlay 自动跟踪
};
