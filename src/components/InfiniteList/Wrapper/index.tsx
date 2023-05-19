import { Fragment, useCallback } from 'react';
import { WrapperProps } from './type';
import Filter from '../Filter';
import List from '../List';

function InfiniteList<T>(props: WrapperProps<T>) {
    const { filter: filterProps = {}, ...listProps } = props;

    const params = listProps.query.params;
    const filterList = filterProps?.filterList;
    const isLoading = listProps.query.isLoading;
    const enableFilter = filterProps?.enableFilter;
    const addAndDelParams = listProps.query.addAndDelParams;
    const haveFilter = useCallback((f: any): f is any[] => Array.isArray(f) && f.length > 0, []);

    return (
        <Fragment>
            <List {...listProps} />
            {!isLoading && haveFilter(filterList) && enableFilter !== false && (
                <Filter {...filterProps} filterList={filterList} params={params} addAndDelParams={addAndDelParams} />
            )}
        </Fragment>
    );
}

export default InfiniteList;
