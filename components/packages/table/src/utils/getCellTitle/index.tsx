import React from 'react';

const getCellTitle = (children: any) => {
    if (typeof children === 'string' || typeof children === 'number') {
        return children.toString();
    } else if (React.isValidElement(children) && typeof (children.props as any).children === 'string') {
        return (children.props as any).children;
    }
    return null;
};

export default getCellTitle;
