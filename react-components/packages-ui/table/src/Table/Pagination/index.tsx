import { Pagination as AntdPagination, PaginationProps } from 'antd';

import styles from './index.module.less';
import { useTableContext } from '../../TableContext';

const Pagination = () => {
    const { pagination, isEmpty } = useTableContext();

    if (pagination === false || isEmpty) {
        return null;
    }

    const defaultProps: PaginationProps = {
        showLessItems: true,
        showSizeChanger: true,
        showQuickJumper: true,
        hideOnSinglePage: false,
    };

    const showTotal = pagination.showTotal ?? ((total: number) => <span className={styles['total']}>{`共 ${total} 条`}</span>);

    return (
        <div className={styles['pagination']}>
            {showTotal ? showTotal(pagination.total) : <span />}
            <AntdPagination {...defaultProps} {...pagination} showTotal={undefined} />
        </div>
    );
};

export default Pagination;
