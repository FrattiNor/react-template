import React, { FC } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { useLocation, Switch, useRouteMatch } from 'react-router-dom'
import { getAllKeys, getKey } from './util'
import styles from './transform/index.less'
// import styles from './absolute/index.less'

/**
 * @description 传入的 children 需要是Switch组件，这样才能控制 location
 * @description 如果使用绝对定位的翻页动画组件，确保children在已经确定的布局内，不然容易触发各种定位错误问题（ps：如果无法使用此组件，可以使用同目录下的transform组件）
 */

const Transition: FC = ({ children }) => {
    const location = useLocation()
    const match = useRouteMatch()
    const { pathname } = location
    const allKeys = getAllKeys(children, match)
    const key = getKey(allKeys, pathname)

    return (
        <div style={{ position: 'relative' }}>
            <SwitchTransition>
                <CSSTransition
                    key={key}
                    timeout={{
                        enter: 500,
                        exit: 500
                    }}
                    classNames={{
                        enter: styles['enter'],
                        enterActive: styles['enter-active'],
                        enterDone: styles['enter-done'],
                        exit: styles['exit'],
                        exitActive: styles['exit-active'],
                        exitDone: styles['exit-done']
                    }}
                >
                    <div>
                        <Switch location={location}>{children}</Switch>
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}

export default Transition
