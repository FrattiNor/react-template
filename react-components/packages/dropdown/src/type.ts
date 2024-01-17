import { PropsWithChildren } from 'react';

export type DropdownPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type DropdownItem = {
    key: string;
    label: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => boolean | void;
};

export type DropdownProps = PropsWithChildren<{
    items: DropdownItem[];
    placement?: DropdownPlacement;
    getContainer?: () => HTMLElement | undefined;
}>;
