export type DropdownPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type DropdownItem = {
    label: string;
    key: string;
    onClick?: () => void;
};

export type DropdownProps = {
    items: DropdownItem[];
    placement?: DropdownPlacement;
};
