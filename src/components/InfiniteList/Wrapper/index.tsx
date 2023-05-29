import styles from './index.module.less';
import { WrapperProps } from './type';
import { useCallback } from 'react';
import Filter from '../Filter';
import Float from '../Float';
import List from '../List';

function InfiniteList<T>(props: WrapperProps<T>) {
    const { filter: filterProps = {}, float: floatProps = {}, ...listProps } = props;

    const query = listProps.query;
    const params = query.params;
    const isLoading = query.isLoading;
    const filterList = filterProps?.filterList;

    const RenderFloat = floatProps?.render;
    const addAndDelParams = listProps.query.addAndDelParams;
    const haveFilter = useCallback((f: any): f is any[] => Array.isArray(f) && f.length > 0, []);

    return (
        <div className={styles['wrapper']}>
            <List {...listProps} />

            {!isLoading && RenderFloat && (
                <Float {...floatProps}>
                    <RenderFloat {...query} />
                </Float>
            )}

            {!isLoading && haveFilter(filterList) && (
                <Filter {...filterProps} filterList={filterList} params={params} addAndDelParams={addAndDelParams} />
            )}
        </div>
    );
}

export default InfiniteList;
