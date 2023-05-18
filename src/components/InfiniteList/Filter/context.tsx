/* eslint-disable react-refresh/only-export-components */
import { FormInstance } from 'antd-mobile/es/components/form';
import { FC, PropsWithChildren, createContext, useContext } from 'react';

type Props = {
    form: FormInstance;
};

const FormContext = createContext<Props>({} as Props);

export const Provider: FC<PropsWithChildren<Props>> = ({ children, ...value }) => {
    return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useForm = () => useContext(FormContext);
