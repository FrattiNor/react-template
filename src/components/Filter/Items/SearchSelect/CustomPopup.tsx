import { Dispatch, Fragment, SetStateAction, useCallback, useMemo, useState } from 'react';
import VirtualizerList from '@/components/VirtualizerList';
import { SearchSelectItem } from '../../type';
import styles from './CustomPopup.module.less';
import Iconfont from '@/components/Iconfont';
import { SearchBar } from 'antd-mobile';
import Toast from '@/components/Toast';
import classNames from 'classnames';

type CustomPopupProps<T> = SearchSelectItem<T> & {
    setVisible: Dispatch<SetStateAction<boolean>>;
    value?: string[];
    onChange?: (v: string[]) => void;
};

function CustomPopup<T>(props: CustomPopupProps<T>) {
    const [keyword, setKeyword] = useState('');
    const { onChange, value, multiple, setVisible, option, fieldKeys, max = Infinity } = props;
    const { data, isFetching } = option(keyword);

    // value 转为 obj，方便查询checked状态
    const valueObj = useMemo(() => {
        const map: Record<string, boolean> = {};
        value?.forEach((item) => {
            map[item] = true;
        });
        return map;
    }, [value]);

    // 临时value，提交时再onChange
    const [temporaryValue, setTemporaryValue] = useState<Record<string, boolean>>(valueObj);

    const handledData: string[] = useMemo(() => {
        if (keyword === '') return Object.keys(temporaryValue);
        return fieldKeys === 'isStringArray' ? data || [] : (data || []).map((item) => (item as any)[fieldKeys?.value as any]);
    }, [keyword, data, temporaryValue]);

    // 提交
    const submit = useCallback(() => {
        if (onChange) onChange(Object.keys(temporaryValue));
        setVisible(false);
    }, [temporaryValue]);

    // 取消
    const cancel = useCallback(() => {
        setVisible(false);
    }, []);

    // 点击变更checked状态
    const onClick = useCallback(
        (item: string) => {
            setTemporaryValue((v) => {
                const checked = v[item];
                if (!checked) {
                    if (multiple) {
                        const nextValue = { ...v, [item]: true };
                        if (Object.keys(nextValue).length > max) {
                            Toast.fail('超过上限');
                            return { ...v };
                        }
                        return nextValue;
                    } else {
                        return { [item]: true };
                    }
                } else {
                    delete v[item];
                    return { ...v };
                }
            });
        },
        [multiple],
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
                <SearchBar placeholder="搜索" onChange={setKeyword} />
            </div>

            <VirtualizerList
                borderWidth={1}
                data={handledData}
                loading={isFetching}
                rowKey={(_, i) => `${i}`}
                className={styles['content']}
                renderItem={(item) => {
                    const checked = temporaryValue[item];
                    return (
                        <div className={styles['item']} onClick={() => onClick(item)}>
                            <div className={classNames(styles['label'], { [styles['checked']]: checked })}>{item}</div>
                            <div className={classNames(styles['icon'], { [styles['show']]: checked })}>
                                <Iconfont icon="yes" />
                            </div>
                        </div>
                    );
                }}
            />
        </Fragment>
    );
}

export default CustomPopup;
