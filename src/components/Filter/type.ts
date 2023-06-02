import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { DatePickerProps } from 'antd-mobile';

export type FieldKeys<T> =
    | {
          label: keyof T;
          value: keyof T;
      }
    | 'isStringArray';

export type SearchSelectFieldKeys<T> =
    | {
          value: keyof T;
      }
    | 'isStringArray';

export type CascaderFieldKeys<T> = {
    label: keyof T;
    value: keyof T;
    children: keyof T;
};

export type InputItem = {
    type: 'input';
    name: string;
    label: string;
    placeholder?: string;
    array?: boolean;
};

export type SelectItem<T> = {
    type: 'select';
    name: string;
    label: string;
    placeholder?: string;
    multiple?: boolean;
    option: T[] | (() => UseQueryResult<null | T[]>);
    fieldKeys?: FieldKeys<T>;
    max?: number;
};

export type BlockSelectItem<T> = {
    type: 'block-select';
    name: string;
    label: string;
    columns: number;
    multiple?: boolean;
    option: T[];
    fieldKeys?: FieldKeys<T>;
};

export type DatePickItem = {
    type: 'date-picker';
    name: string;
    label: string;
    placeholder?: string;
    format?: string;
    precision?: DatePickerProps['precision'];
};

export type RangPickItem = {
    type: 'rang-picker';
    name: [string, string];
    label: [string, string];
    placeholder?: [string, string];
    format?: string | [string, string];
    precision?: DatePickerProps['precision'];
};

export type CascaderItem<T> = {
    type: 'cascader';
    name: string;
    label: string;
    placeholder?: string;
    option: T[] | (() => UseQueryResult<null | T[]>);
    fieldKeys?: CascaderFieldKeys<T>;
};

export type SearchSelectItem<T> = {
    type: 'search-select';
    name: string;
    label: string;
    multiple?: boolean;
    placeholder?: string;
    option: (v: string) => UseQueryResult<null | T[]>;
    fieldKeys?: SearchSelectFieldKeys<T>;
    max?: number;
};

export type FilterItem<T> = InputItem | SelectItem<T> | BlockSelectItem<T> | DatePickItem | RangPickItem | CascaderItem<T> | SearchSelectItem<T>;

export type FilterProps = {
    className?: string;
    style?: CSSProperties;
    params: Record<string, any>;
    filterList: Array<FilterItem<any>>;
    addAndDelParams: ({ add, del }: { add?: Record<string, any>; del?: string[] }) => void;
};

export type ContentProps = Pick<FilterProps, 'filterList' | 'params' | 'addAndDelParams'> & {
    setVisible: Dispatch<SetStateAction<boolean>>;
};
