import { CSSProperties, ComponentClass, Dispatch, FC, LazyExoticComponent, PropsWithChildren, ReactNode } from 'react';

import { ButtonProps } from '@pkg/button';

export type ModalProps = PropsWithChildren<{
    getContainer?: () => HTMLElement | undefined;

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
    hiddenCloseX?: boolean;
    cancelText?: string;
    confirmText?: string;
    confirmLoading?: boolean;
    closeableByConfirmLoading?: boolean;
    submitButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    onSubmit?: () => any;
    onCancel?: () => any;

    visible?: boolean;
    onVisibleChange?: Dispatch<boolean>;
}>;

export type OverlayProps = Omit<ModalProps, 'getContainer' | 'onVisibleChange'> & {
    setVisible: Dispatch<boolean>;
};

export type AutoModals = {
    readonly [key: string]: LazyExoticComponent<FC<any> | ComponentClass<any>>;
};
