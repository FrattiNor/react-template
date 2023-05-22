import { Dispatch, Fragment, SetStateAction, useCallback, useMemo, useState } from 'react';
import VirtualizerList from '@/components/VirtualizerList';
import { Picker, Popup, SearchBar } from 'antd-mobile';
import styles from './CustomSelect.module.less';
import Iconfont from '@/components/Iconfont';
import { SelectItem } from '../../type';
import classNames from 'classnames';

type fieldKeysItem = { label: string | number; value: string | number };

type CustomSelectProps<T> = Omit<SelectItem<T>, 'option'> & {
    opt: T[];
    visible: boolean;
    loading?: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    value?: string[];
    onChange?: (v: string[]) => void;
};

type CustomPopupProps<T> = CustomSelectProps<T> & {
    fieldKeysOpt: fieldKeysItem[];
};

function CustomPopup<T>({ fieldKeysOpt, setVisible, value, onChange, multiple, loading }: CustomPopupProps<T>) {
    // value 转为 obj，方便查询checked状态
    const valueObj = useMemo(() => {
        const map: Record<string, boolean> = {};
        value?.forEach((item) => {
            map[item] = true;
        });
        return map;
    }, []);

    // 临时value，提交时再onChange
    const [temporaryValue, setTemporaryValue] = useState<Record<string, boolean>>(valueObj);

    // 搜索后的options
    const [searchedOptions, setSearchedOptions] = useState(fieldKeysOpt);

    // 提交
    const submit = useCallback(() => {
        if (onChange) onChange(Object.keys(temporaryValue));
        setVisible(false);
    }, [temporaryValue]);

    // 取消
    const cancel = useCallback(() => {
        setVisible(false);
    }, []);

    // 获取checked状态
    const itemChecked = useCallback(
        (item: fieldKeysItem) => {
            return temporaryValue[item.value];
        },
        [temporaryValue],
    );

    // 点击变更checked状态
    const onClick = useCallback(
        (item: fieldKeysItem) => {
            setTemporaryValue((v) => {
                const checked = v[item.value];
                if (!checked) {
                    if (multiple) {
                        return { ...v, [item.value]: true };
                    } else {
                        return { [item.value]: true };
                    }
                } else {
                    delete v[item.value];
                    return { ...v };
                }
            });
        },
        [multiple],
    );

    // 搜索变更searchedOptions
    const searchChange = useCallback(
        (val: string) => {
            if (val) {
                const nextOpts = fieldKeysOpt.filter((item) => item.label.toString().includes(val));
                setSearchedOptions([...nextOpts]);
            } else {
                setSearchedOptions(fieldKeysOpt);
            }
        },
        [fieldKeysOpt],
    );

    return (
        <Fragment>
            <div className={styles['top']}>
                <div className={styles['button']} onClick={cancel}>
                    取消
                </div>
                <div className={styles['button']} onClick={submit}>
                    确定
                </div>
            </div>

            <div className={styles['search']}>
                <SearchBar placeholder="搜索" onChange={searchChange} />
            </div>

            <VirtualizerList
                borderWidth={1}
                loading={loading}
                data={searchedOptions}
                rowKey={(_, i) => `${i}`}
                className={styles['content']}
                renderItem={(item) => {
                    return (
                        <div className={styles['item']} onClick={() => onClick(item)}>
                            <div className={styles['label']}>{item.label}</div>
                            <div className={classNames(styles['icon'], { [styles['show']]: itemChecked(item) })}>
                                <Iconfont icon="yes" />
                            </div>
                        </div>
                    );
                }}
            />
        </Fragment>
    );
}

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
                    if (Array.isArray(value) && value.length > 0) {
                        return <div style={{ wordBreak: 'break-all' }}>{value.map((item) => optObj[item] || '-').join('，')}</div>;
                    }
                    return <span style={{ color: 'var(--adm-color-light)' }}>{placeholder}</span>;
                }}
            </Picker>

            <Popup visible={visible} bodyClassName={styles['popup-body']} onMaskClick={() => setVisible(false)} destroyOnClose>
                <CustomPopup {...props} fieldKeysOpt={fieldKeysOpt} />
            </Popup>
        </Fragment>
    );
}

export default CustomSelect;
