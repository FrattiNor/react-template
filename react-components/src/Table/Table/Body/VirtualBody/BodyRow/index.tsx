import classNames from 'classnames';

import { useTableContext } from '../../../../TableContext';
import BodyCell from '../BodyCell';
import styles from '../index.module.less';

import type { AnyObj } from '../../../../type';

type Props<T> = {
    currentRowData: T;
    currentRowKey: string;
    currentRowIndex: number;
};

const BodyRow = <T extends AnyObj>(props: Props<T>) => {
    const tableContext = useTableContext<T>();
    const { rowHeight } = tableContext.handledProps;
    const { currentRowData, currentRowIndex, currentRowKey } = props;
    const { handledFixedLeftColumns, handledFixedRightColumns, handledMidColumns } = tableContext;
    const { ping, selectedRowKeysObj, verticalMeasureElement, midLeftPadding, midRightPadding, setClickedRow } = tableContext;

    const rowClick = () => setClickedRow((v) => (v !== currentRowKey ? currentRowKey : null));
    const measureProps = { ['data-index']: currentRowIndex, ref: verticalMeasureElement };
    const midColumns = handledMidColumns;
    const midStyle = { paddingLeft: midLeftPadding, paddingRight: midRightPadding };

    return (
        <div
            {...measureProps}
            onClick={rowClick}
            style={{ minHeight: rowHeight }}
            className={classNames(styles['body-row'], {
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
