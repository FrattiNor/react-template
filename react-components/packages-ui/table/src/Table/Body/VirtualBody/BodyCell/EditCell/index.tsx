import { CSSProperties, FC, useRef, useState } from 'react';

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
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

const EditCell: FC<Props> = ({ rowKey, cellKey, text, style, className, saveEdit, onMouseEnter, onMouseLeave }) => {
    const key = `${cellKey}-${rowKey}`;
    const tableContext = useTableContext();
    const [isEdit, _setEdit] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { editCellValues, setEditCellValues } = tableContext;

    // 当前值，未编辑使用原始值，编辑过使用编辑缓存内的值
    const value = editCellValues[key] ?? text;

    //  设置值，存进编辑缓存内
    const setValue = (v: string) => {
        setEditCellValues((old) => ({
            ...old,
            [key]: v,
        }));
    };

    // 设置是否编辑
    const setEdit = (v: boolean) => {
        _setEdit(v);

        if (v === false) {
            saveEdit(value);
        }

        if (v === true) {
            window.requestAnimationFrame(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus({ preventScroll: true });
                    textareaRef.current.select();
                }
            });
        }
    };

    return (
        <div
            style={style}
            className={className}
            title={getShowValue(value)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onDoubleClick={() => setEdit(true)}
        >
            <div className={classNames(styles['body-cell-edit-str'], { [styles['edit']]: isEdit })}>{getShowValue(value)}</div>

            {isEdit && <div className={styles['border']} />}

            {isEdit && (
                <textarea
                    value={value}
                    ref={textareaRef}
                    onBlur={() => setEdit(false)}
                    className={styles['textarea']}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setValue(e.target.value)}
                />
            )}
        </div>
    );
};

export default EditCell;
