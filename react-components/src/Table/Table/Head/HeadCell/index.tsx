import { notEmpty } from '@react/utils';

import ResizableTitle from './ResizableTitle';
import useFilter from './useFilter';
import getCellTitle from '../../../utils/getCellTitle';
import styles from '../index.module.less';

import type { HandledColumn } from '../../../type';
import type { AnyObj } from '../../../type';

type Props<T> = {
    column: HandledColumn<T>;
};

const HeadCell = <T extends AnyObj>(props: Props<T>) => {
    const { column } = props;
    const { resize, title, key, width, align, filter } = column;
    const cellValue = notEmpty(title);
    const cellTitle = getCellTitle(cellValue);
    const iStr = typeof cellValue === 'string' || typeof cellValue === 'number';
    const filterDom = useFilter(filter);

    return (
        <ResizableTitle cellKey={key} resize={resize} title={cellTitle} className={styles['head-cell']} style={{ width, textAlign: align }}>
            <div className={iStr ? styles['head-cell-str'] : styles['head-cell-block']}>{cellValue}</div>
            {filterDom && <div className={styles['head-cell-filter']}>{filterDom}</div>}
        </ResizableTitle>
    );
};

export default HeadCell;
