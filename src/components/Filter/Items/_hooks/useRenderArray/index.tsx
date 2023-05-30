import Clear from '../../_components/Clear';
import { Form } from 'antd-mobile';
import { FC } from 'react';

const useRenderArray = () => {
    const renderArray = (name: string, label: string, Component: FC<any>, props: any) => {
        return (
            <Form.Array name={name} renderAdd={() => <span>添加{label}</span>}>
                {(fields, { remove }) =>
                    fields.map(({ index }) => {
                        const clear = () => remove(index);
                        const arrow = <Clear clear={clear} />;

                        return (
                            <Component
                                {...props}
                                key={index}
                                arrow={arrow}
                                name={[index]}
                                subscribeName={[name, index]}
                                label={`${label}${index + 1}`}
                            />
                        );
                    })
                }
            </Form.Array>
        );
    };

    return { renderArray };
};

export default useRenderArray;
