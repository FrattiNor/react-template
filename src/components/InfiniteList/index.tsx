import LoadingIcon from './components/LoadingIcon';
import { Fragment, useCallback } from 'react';
import styles from './index.module.less';
import Filter from './components/Filter';
import { WrapperProps } from './type';
import List from './components/List';

function InfiniteList<T>(props: WrapperProps<T>) {
    const { filter: filterProps = {}, ...listProps } = props;

    const params = listProps.query.params;
    const isLoading = listProps.query.isLoading;
    const setParams = listProps.query.setParams;
    const filterList = filterProps?.filterList;
    const enableFilter = filterProps?.enableFilter;
    const haveFilter = useCallback((f: any): f is any[] => Array.isArray(f) && f.length > 0, []);

    return (
        <div className={styles['wrapper']}>
            {isLoading && (
                <div className={styles['loading']}>
                    <LoadingIcon className={styles['icon']} />
                </div>
            )}

            {!isLoading && (
                <Fragment>
                    <List {...listProps} />
                    {haveFilter(filterList) && enableFilter !== false && (
                        <Filter {...filterProps} filterList={filterList} params={params} setParams={setParams} />
                    )}
                </Fragment>
            )}
        </div>
    );
}

export default InfiniteList;
