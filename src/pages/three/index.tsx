import React, { FC } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './index.less'

type Props = {}

const One: FC<RouteComponentProps & Props> = ({ history }) => {
    console.log(history)

    return (
        <div className={styles.wrapper} onClick={() => history.push('/two')}>
            THree
        </div>
    )
}

export default withRouter(One)
