import { type FC, type PropsWithChildren, Fragment, useLayoutEffect } from 'react';

import { App } from 'antd';

import notice from './notice';

const NoticeProvider: FC<PropsWithChildren> = ({ children }) => {
	const staticFunction = App.useApp();

	useLayoutEffect(() => {
		notice.setNotification(staticFunction.notification);
	}, []);

	return <Fragment>{children}</Fragment>;
};

export default NoticeProvider;
