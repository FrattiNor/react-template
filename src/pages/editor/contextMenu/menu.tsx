/* eslint-disable react/no-array-index-key */
import { Fragment, useEffect, useRef, useState } from 'react';
import type { CSSProperties, FC } from 'react';
import type Editor from '../_editor';
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
    disabled?: boolean;
};

type Menus = MenuItem | MenuGroup;

const getMenu = (editor: Editor): Menus[] => [
    {
        type: 'item',
        text: '复制',
        key: 'Copy',
        disabled: !editor.handler.canCloneActive(),
        handler: () => {
            editor.contextMenu.hiddenMenu();
            editor.handler.cloneActive();
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
                disabled: !editor.handler.canGroupActive(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.handler.groupActive();
                },
            },
            {
                type: 'item',
                text: '拆分组合',
                key: 'UnGroup',
                disabled: !editor.handler.canUnGroupActive(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.handler.unGroupActive();
                },
            },
        ],
    },
    {
        type: 'group',
        key: 'zIndex',
        disabled: !editor.handler.canUpActive(), // 能否移层的判断都是一致的
        children: [
            {
                type: 'item',
                text: '上移一层',
                key: 'Up',
                disabled: !editor.handler.canUpActive(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.handler.upActive();
                },
            },
            {
                type: 'item',
                text: '下移一层',
                key: 'Down',
                disabled: !editor.handler.canDownActive(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.handler.downActive();
                },
            },
            {
                type: 'item',
                text: '移到顶层',
                key: 'Top',
                disabled: !editor.handler.canUpTopActive(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.handler.upTopActive();
                },
            },
            {
                type: 'item',
                text: '移到低层',
                key: 'Bottom',
                disabled: !editor.handler.canDownTopActive(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.handler.downTopActive();
                },
            },
        ],
    },
    {
        type: 'group',
        key: 'align',
        disabled: !editor.alignment.canAlign(),
        children: [
            {
                type: 'item',
                text: '左对齐',
                key: 'Left',
                disabled: !editor.alignment.canAlign(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.alignment.leftAlign();
                },
            },
            {
                type: 'item',
                text: '右对齐',
                key: 'Right',
                disabled: !editor.alignment.canAlign(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.alignment.rightAlign();
                },
            },
            {
                type: 'item',
                text: '顶部对齐',
                key: 'Top',
                disabled: !editor.alignment.canAlign(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.alignment.TopAlign();
                },
            },
            {
                type: 'item',
                text: '底部对齐',
                key: 'Bottom',
                disabled: !editor.alignment.canAlign(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.alignment.BottomAlign();
                },
            },
            {
                type: 'item',
                text: '水平居中',
                key: 'XCenter',
                disabled: !editor.alignment.canAlign(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.alignment.xCenterAlign();
                },
            },
            {
                type: 'item',
                text: '垂直居中',
                key: 'YCenter',
                disabled: !editor.alignment.canAlign(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.alignment.yCenterAlign();
                },
            },
            {
                type: 'item',
                text: '水平均分',
                key: 'XAverage',
                disabled: !editor.alignment.canAlign(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.alignment.xAverageAlign();
                },
            },
            {
                type: 'item',
                text: '垂直均分',
                key: 'YAverage',
                disabled: !editor.alignment.canAlign(),
                handler: () => {
                    editor.contextMenu.hiddenMenu();
                    editor.alignment.yAverageAlign();
                },
            },
        ],
    },
    {
        type: 'item',
        text: '删除',
        key: 'Delete',
        disabled: !editor.handler.canDeleteActive(),
        style: { color: 'rgb(255,0,0)' },
        handler: () => {
            editor.contextMenu.hiddenMenu();
            editor.handler.deleteActive();
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
        return m.map((item, i) => {
            switch (item.type) {
                case 'group': {
                    const _item = item as MenuGroup;
                    if (_item.disabled !== true) {
                        return (
                            <div key={_item.key} className={styles['menu-group']}>
                                {renderMenu(_item.children)}
                            </div>
                        );
                    }
                }
                case 'item': {
                    const _item = item as MenuItem;
                    if (_item.disabled !== true) {
                        return (
                            <div key={_item.key} className={styles['menu-item']} onClick={_item.handler} style={_item.style}>
                                <span className={styles['content']}>{_item.text}</span>
                                <span className={styles['tip']}>{_item.key}</span>
                            </div>
                        );
                    }
                }
                default:
                    return <Fragment key={i} />;
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
