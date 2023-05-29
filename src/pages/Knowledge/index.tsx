import { useKnowledgeList } from '@/services/knowledge';
import BoxShadow from '@/components/Header/boxShadow';
import InfiniteList from '@/components/InfiniteList';
import useFilter from './Filter';
import useRender from './Render';

const Knowledge = () => {
    const filterList = useFilter();
    const query = useKnowledgeList();
    const { renderItem } = useRender();

    return (
        <BoxShadow>
            <InfiniteList rowKey="id" query={query} enableVisible={true} filter={{ filterList }} renderItem={renderItem} />
        </BoxShadow>
    );
};

export default Knowledge;
