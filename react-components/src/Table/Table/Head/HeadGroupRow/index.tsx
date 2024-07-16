import type { CSSProperties, FC } from 'react';

import { notEmpty } from '@react/utils';
import classNames from 'classnames';

import { useTableContext } from '../../../TableContext';
import getCellTitle from '../../../utils/getCellTitle';
import styles from '../index.module.less';

type Props = {
    rowIndex: number;
};

const HeadGroupRow: FC<Props> = ({ rowIndex }) => {
    const tableContext = useTableContext();
    const { rowHeight } = tableContext.handledProps;
    const { handledHeadGroups, handledColumns } = tableContext.handledColumnsObj;
    const { getStickyStyleClass } = tableContext.columnsGridSizeAndSticky;

    const groups = handledHeadGroups[rowIndex];

    return (
        <div className={styles['head-group-row']}>
            {groups.map(({ title, start, span, key }) => {
                const cellValue = notEmpty(title);
                const cellTitle = getCellTitle(cellValue);
                const cellSticky = getStickyStyleClass(handledColumns[start].key, 'head');
                const iStr = typeof cellValue === 'string' || typeof cellValue === 'number';
                const cellStyle: CSSProperties = {
                    textAlign: 'center',
                    gridRow: rowIndex + 1,
                    gridColumn: `${start + 1}/${start + span + 1}`,
                    ...cellSticky.style,
                };

                return (
                    <div key={key} className={classNames(styles['head-cell'], cellSticky.class)} title={cellTitle} style={cellStyle}>
                        <div className={styles['head-cell-inner']} style={{ minHeight: rowHeight }}>
                            <div className={iStr ? styles['head-cell-str'] : styles['head-cell-block']}>{cellValue}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HeadGroupRow;
