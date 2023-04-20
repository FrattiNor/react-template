import { Fragment, useEffect, useRef, useState } from 'react';
import type { CSSProperties, FC } from 'react';
import type Editor from '../_editor';
import classNames from 'classnames';
import styles from './menu.less';

type Props = {
    x: number;
    y: number;
    editor: Editor;
};

type MenuItem = {
    type: 'item';
    key: string;
    text: string;
    handler: () => void;
    style?: CSSProperties;
    disabled?: boolean;
};

type MenuGroup = {
    type: 'group';
    key: string;
    children: MenuItem[];
};

type Menus = MenuItem | MenuGroup;

const getMenu = (editor: Editor): Menus[] => [
    {
        type: 'item',
        text: '复制',
        key: 'Copy',
        disabled: !editor.activeHandler.canClone(),
        handler: () => {
            editor.contextMenu.hiddenMenu();
            editor.activeHandler.clone();
        },
    },
    {
        type: 'group',
        key: 'group',
        children: [
            {
                type: 'item',
                text: '组合',
                key: 'Group',
                disabled: !editor.activeHandler.canGroup(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.activeHandler.group();
                },
            },
            {
                type: 'item',
                text: '拆分组合',
                key: 'UnGroup',
                disabled: !editor.activeHandler.canUnGroup(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.activeHandler.unGroup();
                },
            },
        ],
    },
    {
        type: 'group',
        key: 'zIndex',
        children: [
            {
                type: 'item',
                text: '上移一层',
                key: 'Up',
                disabled: !editor.activeHandler.canUp(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.activeHandler.up();
                },
            },
            {
                type: 'item',
                text: '下移一层',
                key: 'Down',
                disabled: !editor.activeHandler.canDown(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.activeHandler.down();
                },
            },
            {
                type: 'item',
                text: '移到顶层',
                key: 'Top',
                disabled: !editor.activeHandler.canUpTop(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.activeHandler.upTop();
                },
            },
            {
                type: 'item',
                text: '移到低层',
                key: 'Bottom',
                disabled: !editor.activeHandler.canDownTop(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.activeHandler.downTop();
                },
            },
        ],
    },
    {
        type: 'item',
        text: '删除',
        key: 'Delete',
        disabled: !editor.activeHandler.canDelete(),
        style: { color: 'rgb(255,0,0)' },
        handler: () => {
            editor.contextMenu.hiddenMenu();
            editor.activeHandler.delete();
        },
    },
];

const Menu: FC<Props> = ({ x, y, editor }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [menu] = useState<Menus[]>(getMenu(editor));
    const [visible, setVisible] = useState(false);
    const [left, setLeft] = useState(x);
    const [top, setTop] = useState(y);

    // 计算菜单出现的位置
    useEffect(() => {
        if (ref.current) {
            let _top = y;
            let _left = x;
            const width = ref.current.clientWidth;
            const height = ref.current.clientHeight;
            const canvasWidth = editor.canvas.width;
            const canvasHeight = editor.canvas.height;
            if (canvasHeight && canvasWidth) {
                // 如果鼠标靠近画布右侧，菜单就出现在鼠标指针左侧
                if (canvasWidth - _left <= width) {
                    _left -= width + 1;
                } else {
                    _left += 1;
                }
                // 如果鼠标靠近画布底部，菜单就出现在鼠标指针上方
                if (canvasHeight - _top <= height) {
                    _top -= height + 1;
                } else {
                    _top += 1;
                }
                setTop(_top);
                setLeft(_left);
                setVisible(true);
            }
        }
    }, [x, y]);

    const renderMenu = (m: Menus[]) => {
        return m.map((item) => {
            switch (item.type) {
                case 'group': {
                    const _item = item as MenuGroup;
                    return (
                        <div key={_item.key} className={styles['menu-group']}>
                            {renderMenu(_item.children)}
                        </div>
                    );
                }
                case 'item': {
                    const _item = item as MenuItem;
                    return (
                        <div key={_item.key} className={classNames(styles['menu-item'], { [styles['disabled']]: _item.disabled })} onClick={_item.handler} style={_item.style}>
                            <span className={styles['content']}>{_item.text}</span>
                            <span className={styles['tip']}>{_item.key}</span>
                        </div>
                    );
                }
                default:
                    return <Fragment />;
            }
        });
    };

    return (
        <div ref={ref} className={styles['menu']} style={{ top, left, visibility: visible ? 'visible' : 'hidden' }}>
            {renderMenu(menu)}
        </div>
    );
};

export default Menu;
