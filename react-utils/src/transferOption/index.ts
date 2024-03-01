import { isObject } from '../valueType';

type TreeFieldKeys<T> = {
    label: keyof T;
    value: keyof T;
    children: keyof T;
};

type TreeOptionItem = {
    label: string;
    value: string;
    children?: TreeOptionItem[];
};

type FieldKeys<T> = {
    label: keyof T;
    value: keyof T;
};

type OptionItem = {
    label: string;
    value: string;
};

type ObjFieldKeys = { label: 'key'; value: 'value' } | { label: 'value'; value: 'key' };

function transferOption(option: Record<string, string>, fieldKeys: ObjFieldKeys): OptionItem[];
function transferOption<T>(option: T[], fieldKeys: TreeFieldKeys<T>): TreeOptionItem[];
function transferOption<T>(option: T[], fieldKeys: FieldKeys<T>): OptionItem[];

function transferOption<T>(option: Record<string, string> | T[], fieldKeys: ObjFieldKeys | TreeFieldKeys<T> | FieldKeys<T>) {
    if (isObject(option)) {
        return Object.entries(option).map(([key, value]) => {
            const entries = { key, value };
            return {
                label: entries[(fieldKeys as ObjFieldKeys)['label']],
                value: entries[(fieldKeys as ObjFieldKeys)['value']],
            };
        });
    } else {
        const handleTreeOption = (v: T[]) => {
            const res: TreeOptionItem[] = [];
            v.forEach((item) => {
                const child = item[(fieldKeys as TreeFieldKeys<T>)['children']];
                const value = item[(fieldKeys as TreeFieldKeys<T>)['value']] as string;
                const label = item[(fieldKeys as TreeFieldKeys<T>)['label']] as string;
                const children = Array.isArray(child) && child.length > 0 ? handleTreeOption(child) : undefined;
                res.push({ label, value, children });
            });
            return res;
        };
        return handleTreeOption(option);
    }
}

export default transferOption;
