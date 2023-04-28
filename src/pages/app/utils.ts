import React from 'react';

export const getTitle = (value: any): string | undefined => {
    try {
        let res: any = value;
        if (React.isValidElement(value)) {
            const element = (value.type as any)(value.props);
            res = element;
        }
        if (typeof res === 'string' || typeof res === 'number') {
            return `${res}`;
        }
        return undefined;
    } catch (e) {
        return undefined;
    }
};
