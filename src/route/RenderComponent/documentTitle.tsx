/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import type { DependencyList, EffectCallback, FC, PropsWithChildren } from 'react';
import { useRef, Fragment, useEffect } from 'react';

// ======= hook ======

type Callback = () => void;

const useComponentWillMount = (cb: Callback) => {
    const mount = useRef(false);
    if (!mount.current) {
        mount.current = true;
        cb();
    }
};

const useEffectNotFirst = (cb: EffectCallback, depends: DependencyList) => {
    const first = useRef(true);
    useEffect(() => {
        if (first.current) {
            first.current = false;
        } else {
            return cb();
        }
    }, [depends]);
};

// ======= hook ======

type Props = PropsWithChildren<{
    title?: string;
}>;

export default (() => {
    // 闭包，保存 title，按组件顺序保存
    const titleList: (string | undefined)[] = [];

    // 获取到最内层的title，并修改document的title
    const setTitle = (title: string | undefined) => {
        titleList.push(title);
        const lastTitle = titleList[titleList.length - 1];
        if (lastTitle) document.title = lastTitle;
    };

    const deleteTitle = () => {
        titleList.pop();
    };

    const NewComponent: FC<Props> = (props) => {
        // useEffect的执行顺序并不按照层级关系执行
        // UNSAFE_componentWillMount被标记为UNSAFE（也可以使用constructor代替）
        // 手动实现类型componentWillMount（该hook必须位于Function的第一行，否则无法在所有之前执行）
        useComponentWillMount(() => {
            setTitle(props.title);
        });

        // 不能第一次执行，useEffect不按树结构顺序执行，第一次交给 useComponentWillMount 执行
        useEffectNotFirst(() => {
            deleteTitle();
            setTitle(props.title);

            return () => {
                deleteTitle();
            };
        }, [props.title]);

        return <Fragment>{props.children}</Fragment>;
    };

    return NewComponent;
})();
