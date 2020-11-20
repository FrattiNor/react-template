import React, { FC, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './index.less'

type Props = {}

const Two: FC<RouteComponentProps & Props> = ({ history }) => {

    useEffect(() => {
        console.log('two')
    },[])

    return <div className={styles.wrapper} onClick={() => history.push('/one')}>Two</div>
}

export default withRouter(Two)
