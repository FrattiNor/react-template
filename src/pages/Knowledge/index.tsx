import { useKnowledgeList } from '@/services/knowledge';
import InfiniteList from '@/components/InfiniteList';
import BoxShadow from '@/components/Header/boxShadow';
import useFilter from './Filter';
import useRender from './Render';
import { Fragment } from 'react';

const Knowledge = () => {
    const filterList = useFilter();
    const query = useKnowledgeList();
    const { renderItem } = useRender();

    return (
        <Fragment>
            <BoxShadow />
            <InfiniteList rowKey="id" query={query} enableVisible={true} filter={{ filterList }} renderItem={renderItem} />
        </Fragment>
    );
};

export default Knowledge;
