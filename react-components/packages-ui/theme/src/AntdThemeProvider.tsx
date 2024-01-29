import { ConfigProvider, theme as antdTheme } from 'antd';
import { FC, PropsWithChildren } from 'react';
import useTheme from './useTheme';

// 因为还有大部分组件使用的是Antd的，所以需要保持主题一致
const AntdThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const { theme } = useTheme();

    return (
        <ConfigProvider theme={{ token: { borderRadius: 4 }, algorithm: theme === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm }}>
            {children}
        </ConfigProvider>
    );
};

export default AntdThemeProvider;
