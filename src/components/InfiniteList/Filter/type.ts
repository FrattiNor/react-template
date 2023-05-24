import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { DatePickerProps } from 'antd-mobile';
import { InfiniteQuery2 } from '../Wrapper/type';

export type FieldKeys<T> =
    | {
          label: keyof T;
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
};

export type SelectItem<T> = {
    type: 'select';
    name: string;
    label: string;
    placeholder?: string;
    multiple?: boolean;
    option: T[] | (() => UseQueryResult<null | T[]>);
    fieldKeys?: FieldKeys<T>;
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

export type FilterItem<T> = InputItem | SelectItem<T> | BlockSelectItem<T> | DatePickItem | RangPickItem | CascaderItem<T>;

export type FilterProps = {
    style?: CSSProperties;
    filterList: Array<FilterItem<any>>;
    params: InfiniteQuery2<any>['params'];
    position?: 'absolute' | 'fixed';
    addAndDelParams: InfiniteQuery2<any>['addAndDelParams'];
};

export type ContentProps = Pick<FilterProps, 'filterList' | 'params' | 'addAndDelParams'> & {
    setVisible: Dispatch<SetStateAction<boolean>>;
};
