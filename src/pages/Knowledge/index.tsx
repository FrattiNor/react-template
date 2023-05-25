import { useKnowledgeList } from '@/services/knowledge';
import InfiniteList from '@/components/InfiniteList';
import Header from '@/components/Header';
import useFilter from './Filter';
import useRender from './Render';

const Knowledge = () => {
    const filterList = useFilter();
    const query = useKnowledgeList();
    const { renderItem } = useRender();

    return (
        <Header>
            <InfiniteList rowKey="id" query={query} enableVisible={true} filter={{ filterList }} renderItem={renderItem} />
        </Header>
    );
};

export default Knowledge;
