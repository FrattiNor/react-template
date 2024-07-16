import type { CSSProperties, FC, ReactNode } from 'react';

import { Pagination as AntdPagination } from 'antd';

import styles from './index.module.less';
import { useTranslation } from '../Local';

import type { PaginationProps as AntdPaginationProps } from 'antd';

export type PaginationProps = Omit<AntdPaginationProps, 'showTotal'> & {
    wrapperStyle?: CSSProperties;
    showTotal?: false | ((total: number) => ReactNode);
};

const Pagination: FC<PaginationProps> = ({ wrapperStyle, showTotal: _showTotal, ...props }) => {
    const { t2 } = useTranslation();

    const defaultProps: AntdPaginationProps = {
        showLessItems: true,
        showSizeChanger: true,
        showQuickJumper: true,
        hideOnSinglePage: false,
        pageSizeOptions: [10, 20, 50, 100, 500, 1000],
    };

    const showTotal =
        _showTotal ?? ((total: number) => <span className={styles['total']}>{t2('package@pagination.total {{x}}', { x: `${total}` })}</span>);

    return (
        <div className={styles['pagination']} style={wrapperStyle}>
            {showTotal && typeof props.total === 'number' ? showTotal(props.total) : <span />}
            <AntdPagination {...defaultProps} {...props} showTotal={undefined} />
        </div>
    );
};

export default Pagination;
