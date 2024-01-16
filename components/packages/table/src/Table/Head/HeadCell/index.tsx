import getCellTitle from '../../../utils/getCellTitle';
import { notEmpty } from '../../../utils/empty';
import { HandledColumn } from '../../../type';
import ResizableTitle from './ResizableTitle';
import styles from '../index.module.less';
import { AnyObj } from '../../../type';

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
