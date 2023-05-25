import { FC, Fragment, PropsWithChildren, createContext, useContext } from 'react';
import { Props, TrProps, ContextProps } from './type';
import styles from './index.module.less';
import classNames from 'classnames';

const Context = createContext<ContextProps>({});

const KeyValueProvider: FC<PropsWithChildren<ContextProps>> = ({ children, ...value }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

const KeyValueTable: FC<Props> = ({ widths, widthClassNames, children }) => {
    const value = useContext(Context);
    const valueWidths = value.widths;
    const valueClassNames = value.widthClassNames;
    const trueWidths = widths || valueWidths;
    const trueClassNames = widthClassNames || valueClassNames;
    const use = trueWidths || trueClassNames;

    return (
        <table className={styles['key-value-table']}>
            <colgroup>
                {use?.map((item, i) => {
                    if (trueWidths) return <col key={i} style={{ width: item }} />;
                    if (trueClassNames) return <col key={i} className={item as string} />;
                    return <Fragment key={i} />;
                })}
            </colgroup>

            <tbody>{children}</tbody>
        </table>
    );
};

const Tr: FC<TrProps> = ({ children }) => {
    const child = Array.isArray(children) ? children : [children];
    return (
        <tr>
            {child.map((item, i) => (
                <td key={i} className={classNames(styles['td'], { [styles['key']]: i % 2 === 0, [styles['value']]: i % 2 !== 0 })}>
                    {item}
                </td>
            ))}
        </tr>
    );
};

export { Tr, KeyValueProvider };
export default KeyValueTable;
