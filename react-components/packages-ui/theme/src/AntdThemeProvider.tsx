import { FC, PropsWithChildren } from 'react';

import { ConfigProvider, theme as antdTheme } from 'antd';

import useTheme from './useTheme';

type Props = PropsWithChildren<{
    fontFamily?: string;
}>;

// 因为还有大部分组件使用的是Antd的，所以需要保持主题一致
const AntdThemeProvider: FC<Props> = ({ children, fontFamily }) => {
    const { theme } = useTheme();

    return (
        <ConfigProvider
            theme={{
                algorithm: theme === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm,
                token: { borderRadius: 4, fontFamily, colorPrimary: theme === 'light' ? '#4096ff' : '#3c89e8' },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default AntdThemeProvider;
