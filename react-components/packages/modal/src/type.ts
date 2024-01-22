import { CSSProperties, ComponentClass, Dispatch, FC, LazyExoticComponent, PropsWithChildren, ReactNode } from 'react';

export type ModalProps = PropsWithChildren<{
    visible?: boolean;
    onVisibleChange?: Dispatch<boolean>;
    afterClose?: () => void;

    width?: number;
    className?: string;
    headBorder?: boolean;
    footBorder?: boolean;
    style?: CSSProperties;
    headStyle?: CSSProperties;
    bodyStyle?: CSSProperties;
    footStyle?: CSSProperties;

    fillUpWindow?: boolean;

    getContainer?: () => HTMLElement | undefined;

    title?: ReactNode | boolean;
    footer?: ReactNode | boolean;
    closeable?: boolean;
    cancelText?: string;
    confirmText?: string;
    confirmLoading?: boolean;
    closeableByConfirmLoading?: boolean;
}>;

export type OverlayProps = PropsWithChildren<{
    afterClose?: () => void;

    width?: number;
    className?: string;
    headBorder?: boolean;
    footBorder?: boolean;
    style?: CSSProperties;
    headStyle?: CSSProperties;
    bodyStyle?: CSSProperties;
    footStyle?: CSSProperties;

    fillUpWindow?: boolean;

    title?: ReactNode | boolean;
    footer?: ReactNode | boolean;
    closeable?: boolean;
    cancelText?: string;
    confirmText?: string;
    confirmLoading?: boolean;
    closeableByConfirmLoading?: boolean;

    visible: boolean;
    setVisible: Dispatch<boolean>;
}>;

export type AutoModals = {
    readonly [key: string]: LazyExoticComponent<FC<any> | ComponentClass<any>>;
};

export type ModalProviderProps = PropsWithChildren<{
    modals: AutoModals;
}>;
