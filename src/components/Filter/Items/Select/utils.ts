import { FieldKeys } from '../../type';

export const getObj = <T>(opt: T[], fieldKeys?: FieldKeys<T>) => {
    const _optObj: Record<string, string> = {};
    const _fieldKeysOpt: { label: string; value: string }[] = [];

    opt.forEach((item) => {
        let _label = '';
        let _value = '';
        if (fieldKeys) {
            _value = (fieldKeys === 'isStringArray' ? item : item[fieldKeys.value]) as string;
            _label = (fieldKeys === 'isStringArray' ? item : item[fieldKeys.label]) as string;
        } else {
            _value = (item as any)['value'];
            _label = (item as any)['label'];
        }
        _optObj[_value] = _label;
        _fieldKeysOpt.push({ label: _label, value: _value });
    });

    return { optObj: _optObj, fieldKeysOpt: _fieldKeysOpt };
};
