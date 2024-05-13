import Pagination from '../../../Pagination';
import { useTableContext } from '../../TableContext';

const TablePagination = () => {
    const { pagination, isEmpty } = useTableContext();

    if (pagination === undefined || isEmpty) {
        return null;
    }

    return <Pagination {...pagination} wrapperStyle={{ paddingTop: 12 }} />;
};

export default TablePagination;
