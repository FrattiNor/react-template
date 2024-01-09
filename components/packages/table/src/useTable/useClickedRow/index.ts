import { useState } from 'react';

const useClickedRow = () => {
    const [clickedRow, setClickedRow] = useState<string | null>(null);
    return { clickedRow, setClickedRow };
};

export default useClickedRow;
