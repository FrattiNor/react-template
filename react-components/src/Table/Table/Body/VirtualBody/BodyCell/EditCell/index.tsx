import type { CSSProperties, FC } from 'react';
import { useRef, useState } from 'react';

import classNames from 'classnames';

import styles from './index.module.less';
import { getShowValue } from './utils';
import { useTableContext } from '../../../../../TableContext';

type Props = {
    rowKey: string;
    cellKey: string;
    className?: string;
    onClick?: () => void;
    style?: CSSProperties;
    text: string | number;
    textStyle?: CSSProperties;
    saveEdit: (v: string) => void;
};

const EditCell: FC<Props> = ({ rowKey, cellKey, text, style, className, saveEdit }) => {
    const key = `${cellKey}-${rowKey}`;
    const tableContext = useTableContext();
    const [isEdit, setEdit] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [cacheValue, setCacheValue] = useState<string | undefined>(undefined);
    const { editCellValues, setEditCellValues } = tableContext.editStore;

    // 编辑时，只使用 cacheValue
    // 非编辑时，使用 context 内的值 或者 当前值
    const value = (isEdit ? cacheValue : editCellValues[key] ?? text) as string;

    //  设置值，存进编辑缓存内
    const setValue = (v: string) => {
        setCacheValue(v);
    };

    // 进去编辑状态
    const enterEditingStatus = () => {
        setEdit(true);
        setCacheValue(value);
        window.requestAnimationFrame(() => {
            if (textareaRef.current) {
                textareaRef.current.focus({ preventScroll: true });
                textareaRef.current.select();
            }
        });
    };

    // 退出编辑状态 并 触发保存
    const exitEditingStatus = (value: string) => {
        setEdit(false);
        saveEdit(value);
        setEditCellValues((old) => ({
            ...old,
            [key]: value,
        }));
    };

    return (
        <div style={style} className={className} title={getShowValue(value)} onDoubleClick={enterEditingStatus}>
            <div className={classNames(styles['body-cell-edit-str'], { [styles['edit']]: isEdit })}>{getShowValue(value)}</div>

            {isEdit && <div className={styles['border']} />}

            {isEdit && (
                <textarea
                    value={value}
                    ref={textareaRef}
                    className={styles['textarea']}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={(e) => exitEditingStatus(e.target.value)}
                />
            )}
        </div>
    );
};

export default EditCell;
