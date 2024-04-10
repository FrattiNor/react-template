export type AnyObj = Record<string, any>;

export type VirtualTreeSelectFieldKeys<T> = {
    key: keyof T;
    label: keyof T;
    children: keyof T;
    disabled?: keyof T | ((v: T) => boolean);
};

export type HandledDataItem<T> = {
    data: T;
    key: string;
    label: string;
    level: number;
    isLeaf: boolean;
    visible: boolean;
    disabled: boolean;
};

export type VirtualTreeSelectProps<T> = {
    data?: T[];
    keyword?: string;
    multiple?: boolean;
    fieldKeys?: VirtualTreeSelectFieldKeys<T>;
    selectedKeys?: string[];
    setSelectedKeys?: React.Dispatch<React.SetStateAction<string[]>>;
};
