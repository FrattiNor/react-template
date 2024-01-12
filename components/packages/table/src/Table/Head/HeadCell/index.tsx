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
    const isStr = typeof cellValue === 'string' || typeof cellValue === 'number';
    const cellTitle = isStr ? `${cellValue}` : '';

    return (
        <ResizableTitle cellKey={key} resize={resize} title={cellTitle} className={styles['head-cell']} style={{ width, textAlign: align }}>
            {isStr ? <div className={styles['head-cell-str']}>{cellValue}</div> : <div className={styles['head-cell-block']}>{cellValue}</div>}
        </ResizableTitle>
    );
};

export default HeadCell;
