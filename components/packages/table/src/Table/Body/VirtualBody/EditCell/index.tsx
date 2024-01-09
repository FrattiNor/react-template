import { useTableContext } from '../../../../TableContext';
import { CSSProperties, FC, useRef } from 'react';
import styles from './index.module.less';
import { getShowValue } from './utils';
import classNames from 'classnames';
import useChange from './useChange';

type Props = {
    rowKey: string;
    cellKey: string;
    className?: string;
    style?: CSSProperties;
    text: string | number;
    textStyle?: CSSProperties;
    saveEdit: (v: string) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

const EditCell: FC<Props> = ({ rowKey, cellKey, text, style, className, saveEdit, onMouseEnter, onMouseLeave }) => {
    const key = `${cellKey}-${rowKey}`;
    const { innerProps } = useTableContext();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { cellEdits, setCellEdits, editCellValues, setEditCellValues } = innerProps;

    // 当前值，未编辑使用原始值，编辑过使用编辑缓存内的值
    const value = editCellValues[key] ?? text;

    // 是否编辑
    const isEdit = cellEdits[key] ?? false;

    // 设置当前值，将数据存入编辑缓存，避免虚拟列表清掉
    const setValue = (v: string) => {
        setEditCellValues((old) => ({
            ...old,
            [key]: v,
        }));
    };

    // 设置是否编辑
    const setEdit = (v: boolean) => {
        setCellEdits((old) => {
            if (v === true) {
                return { [key]: true };
            } else {
                const nextOld = { ...old };
                delete nextOld[key];
                return nextOld;
            }
        });

        if (v === true) {
            window.requestAnimationFrame(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus({ preventScroll: true });
                    textareaRef.current.select();
                }
            });
        }
    };

    // 监听isEdit变更，如果从true -> false, 触发保存
    useChange(isEdit, (nextEdit) => {
        if (nextEdit === false) {
            saveEdit(value);
        }
    });

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
                    onChange={(e) => setValue(e.target.value)}
                />
            )}
        </div>
    );
};

export default EditCell;
