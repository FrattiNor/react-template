import Context from './StrTableContext';
import { Props } from './type';
import { FC } from 'react';
import Line from './line';

const TableLike: FC<Props> = ({ width = {}, style = {}, className = {}, children }) => {
    return <Context.Provider value={{ width, style, className }}>{children}</Context.Provider>;
};

export { Line };
export default TableLike;
