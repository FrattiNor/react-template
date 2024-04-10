export type AnyObj = Record<string, any>;

export type VirtualSelectFieldKeys<T> = {
    key: keyof T;
    label: keyof T;
    disabled?: keyof T | ((v: T) => boolean);
};

export type HandledDataItem<T> = {
    data: T;
    key: string;
    label: string;
    disabled: boolean;
};

export type VirtualSelectProps<T> = {
    data?: T[];
    keyword?: string;
    multiple?: boolean;
    fieldKeys?: VirtualSelectFieldKeys<T>;
    selectedKeys?: string[];
    setSelectedKeys?: React.Dispatch<React.SetStateAction<string[]>>;
};
