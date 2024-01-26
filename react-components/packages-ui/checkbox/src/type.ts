import { PropsWithChildren } from 'react';

export type CheckboxProps = PropsWithChildren<{
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    indeterminate?: boolean;
    onChange?: (c: boolean) => void;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}>;
