import { Fragment, useCallback } from 'react';
import { WrapperProps } from './type';
import Filter from './Filter';
import List from './List';

function InfiniteList<T>(props: WrapperProps<T>) {
    const { filter: filterProps = {}, ...listProps } = props;

    const params = listProps.query.params;
    const isLoading = listProps.query.isLoading;
    const setParams = listProps.query.setParams;
    const filterList = filterProps?.filterList;
    const enableFilter = filterProps?.enableFilter;
    const haveFilter = useCallback((f: any): f is any[] => Array.isArray(f) && f.length > 0, []);

    return (
        <Fragment>
            <List {...listProps} />
            {!isLoading && haveFilter(filterList) && enableFilter !== false && (
                <Filter {...filterProps} filterList={filterList} params={params} setParams={setParams} />
            )}
        </Fragment>
    );
}

export default InfiniteList;
