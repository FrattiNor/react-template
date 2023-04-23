import { createContext, useContext, cloneElement, isValidElement, Fragment } from 'react';
import type { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import type Editor from '../core';
import styles from './index.less';

type Props = {
    theme?: Record<string, string>;
    editor: Editor | null;
};

const Context = createContext<Props>({} as Props);

export const useEditorContext = () => {
    return useContext(Context);
};

export const EditorContextProvider: FC<PropsWithChildren<Props>> = ({ children, editor, theme }) => {
    if (isValidElement(children)) {
        const style = { ...(children.props.style || {}), ...theme };
        const className = classNames(children.props.className, styles['theme-wrapper']);
        return <Context.Provider value={{ editor, theme }}>{cloneElement(children, { className, style } as any)}</Context.Provider>;
    }

    console.error('children is not ReactElement');
    return <Fragment />;
};
