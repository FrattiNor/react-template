import React from 'react';

const isStrNum = (element: any) => {
    return typeof element === 'string' || typeof element === 'number';
};

const getCellTitle = (element: any) => {
    if (isStrNum(element)) {
        return element.toString();
    } else if (React.isValidElement(element)) {
        try {
            const { children } = element.props as any;
            if (isStrNum(children)) {
                return children;
            } else if (typeof element.type === 'function') {
                const renderedElement = (element.type as any)(element.props);
                if (isStrNum(renderedElement)) {
                    return renderedElement;
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
    return null;
};

export default getCellTitle;
