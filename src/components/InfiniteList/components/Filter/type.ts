import { CSSProperties } from 'react';
import { Query } from '../../type';
import { DatePickerProps } from 'antd-mobile';

export type FieldKeys<T> = {
    label: keyof T;
    value: keyof T;
    key?: keyof T;
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
    option: T[] | (() => Promise<null | T[]>);
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

export type FilterItem = InputItem | SelectItem<any> | BlockSelectItem<any> | DatePickItem | RangPickItem;

export type FilterProps = {
    enableFilter?: boolean;
    style?: CSSProperties;
    filterList: Array<FilterItem>;
    params: Query<any>['params'];
    position?: 'absolute' | 'fixed';
    setParams: Query<any>['setParams'];
};

export type ContentProps = Pick<FilterProps, 'filterList' | 'params' | 'setParams'>;
