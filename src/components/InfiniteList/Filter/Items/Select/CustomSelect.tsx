import { Dispatch, Fragment, SetStateAction, useMemo } from 'react';
import styles from './CustomSelect.module.less';
import { Picker, Popup } from 'antd-mobile';
import Value from '../_components/value';
import { SelectItem } from '../../type';
import CustomPopup from './CustomPopup';

export type CustomSelectProps<T> = Omit<SelectItem<T>, 'option'> & {
    opt: T[];
    visible: boolean;
    loading?: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    value?: string[];
    onChange?: (v: string[]) => void;
};

function CustomSelect<T>(props: CustomSelectProps<T>) {
    const { value, placeholder, visible, setVisible, opt, fieldKeys } = props;

    // 获取{label,value}形式的option，同时获取map，方便展示value
    const { optObj, fieldKeysOpt } = useMemo(() => {
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
    }, [opt]);

    return (
        <Fragment>
            <Picker columns={[]}>
                {() => {
                    const haveValue = Array.isArray(value) && value.length > 0;
                    const showText = haveValue ? value.map((item) => optObj[item] || '-').join(', ') : placeholder;
                    return <Value type={haveValue ? 'value' : 'placeholder'}>{showText}</Value>;
                }}
            </Picker>

            <Popup visible={visible} bodyClassName={styles['popup-body']} onMaskClick={() => setVisible(false)} destroyOnClose>
                <CustomPopup {...props} fieldKeysOpt={fieldKeysOpt} />
            </Popup>
        </Fragment>
    );
}

export default CustomSelect;
