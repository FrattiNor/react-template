import { getShowValue, getEditValue } from './utils';
import { useContext2 } from '../../../../Context2';
import { CSSProperties, FC } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';

type Props = {
    rowKey: string;
    cellKey: string;
    className?: string;
    style?: CSSProperties;
    text: string | number;
    textStyle?: CSSProperties;
    onChange: (v: string) => void;
};

const EditCell: FC<Props> = ({ rowKey, cellKey, text, style, className, onChange }) => {
    const key = `${cellKey}-${rowKey}`;
    const { innerProps } = useContext2();
    const { cellEdits, setCellEdits, editCellValues, setEditCellValues } = innerProps;

    // 是否编辑
    const isEdit = cellEdits[key] ?? false;

    // 设置是否编辑
    const setEdit = (v: boolean) => {
        setCellEdits((old) => {
            const nextOld = { ...old };
            if (v === true) {
                nextOld[key] = true;
            } else {
                delete nextOld[key];
            }
            return nextOld;
        });
    };

    // 当前值，未编辑使用原始值，编辑过使用编辑缓存内的值
    const value = editCellValues[key] ?? text;

    // 设置当前值，将数据存入编辑缓存，避免虚拟列表清掉
    const setValue = (v: string) => {
        setEditCellValues((old) => ({
            ...old,
            [key]: v,
        }));
    };

    // 结束编辑
    const endEdit = (endValue: string) => {
        setEdit(false);
        onChange(endValue);
    };

    return (
        <div className={className} style={style} title={getShowValue(value)} onDoubleClick={() => setEdit(true)}>
            <div className={classNames(styles['body-cell-edit-str'], { [styles['edit']]: isEdit })}>{getShowValue(value)}</div>

            <div className={classNames(styles['border'], { [styles['edit']]: isEdit })} />

            {isEdit && (
                <textarea
                    autoFocus
                    value={getEditValue(value)}
                    className={styles['textarea']}
                    onFocus={(e) => e.target.select()}
                    onBlur={(e) => endEdit(e.target.value)}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13) {
                            endEdit((e.target as any).value);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default EditCell;
