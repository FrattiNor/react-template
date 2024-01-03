import { Pagination as AntdPagination, PaginationProps } from 'antd';
import { useTableContext } from '../../TableContext';
import styles from './index.module.less';

const Pagination = () => {
    const { innerProps } = useTableContext();
    const { pagination, isEmpty } = innerProps;

    if (pagination === false || isEmpty) {
        return null;
    }

    const defaultProps: PaginationProps = {
        size: 'small',
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
