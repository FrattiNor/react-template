/**
 * @description 使用 dva 创建  store
 */

import { create } from 'dva-core';
import createLoading from 'dva-loading';

export default (): any => {
    console.log('==== dva ==== start ====');

    const app = create();

    app.use(createLoading());

    app.start();

    return app;
};
