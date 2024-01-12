import { useTableContext } from '../../../../TableContext';
import { AnyObj } from '../../../../type';
import styles from '../index.module.less';
import classNames from 'classnames';
import BodyCell from '../BodyCell';

type Props<T> = {
    measure?: boolean;
    currentRowData: T;
    currentRowKey: string;
    currentRowIndex: number;
};

const BodyRow = <T extends AnyObj>(props: Props<T>) => {
    const tableContext = useTableContext<T>();
    const { rowHeight, virtual = true } = tableContext.props;
    const { currentRowData, currentRowIndex, currentRowKey, measure } = props;
    const { handledFixedLeftColumns, handledFixedRightColumns, handledMidColumns, handledTotalMidColumns } = tableContext;
    const { ping, selectedRowKeysObj, verticalMeasureElement, midLeftPadding, midRightPadding, setClickedRow } = tableContext;
    //
    const isFirst = currentRowIndex === 0;
    const rowClick = () => setClickedRow((v) => (v !== currentRowKey ? currentRowKey : null));
    const measureProps = measure ? { ['data-index']: currentRowIndex, ref: verticalMeasureElement } : {};
    const midColumns = virtual === true || virtual === 'horizontal' ? handledMidColumns : handledTotalMidColumns;
    const midStyle = virtual === true || virtual === 'horizontal' ? { paddingLeft: midLeftPadding, paddingRight: midRightPadding } : {};

    return (
        <div
            {...measureProps}
            onClick={rowClick}
            key={currentRowKey}
            style={{ minHeight: isFirst ? rowHeight - 1 : rowHeight }}
            className={classNames(styles['body-row'], {
                [styles['first']]: isFirst,
                [styles['selected']]: selectedRowKeysObj[currentRowKey],
            })}
        >
            {handledFixedLeftColumns.length > 0 && (
                <div className={classNames(styles['body-fixed-left'], { [styles['pinged']]: ping['left'] })} key="left">
                    {handledFixedLeftColumns.map((column) => {
                        return (
                            <BodyCell
                                column={column}
                                key={column.key}
                                currentRowKey={currentRowKey}
                                currentRowData={currentRowData}
                                currentRowIndex={currentRowIndex}
                            />
                        );
                    })}
                </div>
            )}

            {midColumns.length > 0 && (
                <div className={styles['body-mid']} style={midStyle} key="mid">
                    {midColumns.map((column) => {
                        return (
                            <BodyCell
                                column={column}
                                key={column.key}
                                currentRowKey={currentRowKey}
                                currentRowData={currentRowData}
                                currentRowIndex={currentRowIndex}
                            />
                        );
                    })}
                </div>
            )}

            {handledFixedRightColumns.length > 0 && (
                <div className={classNames(styles['body-fixed-right'], { [styles['pinged']]: ping['right'] })} key="right">
                    {handledFixedRightColumns.map((column) => {
                        return (
                            <BodyCell
                                column={column}
                                key={column.key}
                                currentRowKey={currentRowKey}
                                currentRowData={currentRowData}
                                currentRowIndex={currentRowIndex}
                            />
                        );
                    })}
                </div>
            )}

            <div className={styles['body-seize-a-seat']} key="seize" />
        </div>
    );
};

export default BodyRow;
