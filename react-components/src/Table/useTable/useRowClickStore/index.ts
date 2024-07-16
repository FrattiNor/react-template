import { useState } from 'react';

const useRowClickStore = () => {
    const [clickedRow, setClickedRow] = useState<string | null>(null);

    return { clickedRow, setClickedRow };
};

export type RowClickStore = ReturnType<typeof useRowClickStore>;
export default useRowClickStore;
