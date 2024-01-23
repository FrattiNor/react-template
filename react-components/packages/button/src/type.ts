import { CSSProperties, MouseEventHandler, PropsWithChildren, ReactNode } from 'react';

export type ButtonProps = PropsWithChildren<{
    ghost?: boolean;
    icon?: ReactNode;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    onClick?: MouseEventHandler;
    type?: 'primary' | 'danger' | 'default';
}>;
