import { notEmpty } from '@react/utils';

import ResizableTitle from './ResizableTitle';
import { HandledColumn } from '../../../type';
import { AnyObj } from '../../../type';
import getCellTitle from '../../../utils/getCellTitle';
import styles from '../index.module.less';

type Props<T> = {
    column: HandledColumn<T>;
};

const HeadCell = <T extends AnyObj>(props: Props<T>) => {
    const { column } = props;
    const { resize, title, key, width, align } = column;
    const cellValue = notEmpty(title);
    const cellTitle = getCellTitle(cellValue);
    const iStr = typeof cellValue === 'string' || typeof cellValue === 'number';

    return (
        <ResizableTitle cellKey={key} resize={resize} title={cellTitle} className={styles['head-cell']} style={{ width, textAlign: align }}>
            {iStr ? <div className={styles['head-cell-str']}>{cellValue}</div> : <div className={styles['head-cell-block']}>{cellValue}</div>}
        </ResizableTitle>
    );
};

export default HeadCell;
