import { useTableContext } from '../../../../TableContext';
import { AnyObj, HandledColumn } from '../../../../type';
import { notEmpty } from '../../../../utils/empty';
import styles from '../index.module.less';
import classNames from 'classnames';

type Props<T> = {
    currentRowData: T;
    currentRowKey: string;
    column: HandledColumn<T>;
    currentRowIndex: number;
};

const BodyCell = <T extends AnyObj>(props: Props<T>) => {
    const tableContext = useTableContext<T>();
    const { column, currentRowData, currentRowIndex } = props;
    const { resizeActiveKey, resizeReadyKey } = tableContext;
    //
    const { key, render, width, align } = column;
    const resizeActive = resizeReadyKey === key || resizeActiveKey === key;
    const cellValue = notEmpty(render ? render(currentRowData, currentRowIndex) : currentRowData[key]);
    const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
    const cellTitle = isStr ? `${cellValue}` : '';
    const cellStyle = { width, textAlign: align };
    const cellClassName = classNames(styles['body-cell'], {
        [styles['resize-active']]: resizeActive,
    });

    return (
        <div title={cellTitle} style={cellStyle} className={cellClassName}>
            {isStr ? <div className={styles['body-cell-str']}>{cellValue}</div> : <div className={styles['body-cell-block']}>{cellValue}</div>}
        </div>
    );
};

export default BodyCell;
