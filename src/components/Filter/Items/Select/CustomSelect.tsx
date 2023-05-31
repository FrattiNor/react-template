import { Dispatch, Fragment, SetStateAction, useMemo } from 'react';
import styles from './CustomSelect.module.less';
import { Picker, Popup } from 'antd-mobile';
import Value from '../_components/value';
import { SelectItem } from '../../type';
import CustomPopup from './CustomPopup';
import { getObj } from './utils';

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
    const { optObj, fieldKeysOpt } = useMemo(() => getObj(opt, fieldKeys), [opt]);

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
