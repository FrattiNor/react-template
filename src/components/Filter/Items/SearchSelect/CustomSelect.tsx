import { Dispatch, Fragment, SetStateAction } from 'react';
import styles from './CustomSelect.module.less';
import { SearchSelectItem } from '../../type';
import { Picker, Popup } from 'antd-mobile';
import Value from '../_components/value';
import CustomPopup from './CustomPopup';

type CustomSelectProps<T> = SearchSelectItem<T> & {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    value?: string[];
    onChange?: (v: string[]) => void;
};

function CustomSelect<T>(props: CustomSelectProps<T>) {
    const { value, visible, setVisible, placeholder = '请选择' } = props;

    return (
        <Fragment>
            <Picker columns={[]}>
                {() => {
                    const haveValue = Array.isArray(value) && value.length > 0;
                    const showText = haveValue ? value.join(', ') : placeholder;
                    return <Value type={haveValue ? 'value' : 'placeholder'}>{showText}</Value>;
                }}
            </Picker>

            <Popup visible={visible} bodyClassName={styles['popup-body']} onMaskClick={() => setVisible(false)} destroyOnClose>
                <CustomPopup {...props} />
            </Popup>
        </Fragment>
    );
}

export default CustomSelect;
