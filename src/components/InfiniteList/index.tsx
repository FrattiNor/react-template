import LoadingIcon from './components/LoadingIcon';
import { Fragment, useCallback } from 'react';
import styles from './index.module.less';
import Filter from './components/Filter';
import { WrapperProps } from './type';
import List from './components/List';

function InfiniteList<T>(props: WrapperProps<T>) {
    const { filter: filterProps = {}, ...listProps } = props;

    const loading = listProps.query.loading;
    const filterList = filterProps?.filterList;
    const enableFilter = filterProps?.enableFilter;
    const haveFilter = useCallback((f: any): f is any[] => Array.isArray(f) && f.length > 0, []);

    return (
        <div className={styles['wrapper']}>
            {loading && (
                <div className={styles['loading']}>
                    <LoadingIcon className={styles['icon']} />
                </div>
            )}

            {!loading && (
                <Fragment>
                    <List {...listProps} />
                    {haveFilter(filterList) && enableFilter !== false && <Filter {...filterProps} filterList={filterList} />}
                </Fragment>
            )}
        </div>
    );
}

export default InfiniteList;
