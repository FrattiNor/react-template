import { useKnowledgeList } from '@/services/knowledge';
import InfiniteList from '@/components/InfiniteList';
import useFilter from './Filter';
import useRender from './Render';

const Knowledge = () => {
    const filterList = useFilter();
    const query = useKnowledgeList();
    const { renderItem } = useRender();

    return <InfiniteList rowKey="id" query={query} enableVisible={true} filter={{ filterList }} renderItem={renderItem} />;
};

export default Knowledge;
