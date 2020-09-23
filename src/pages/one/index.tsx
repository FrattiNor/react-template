import React, { FC } from 'react'
import styles from './index.less'

type Props = {}

const One: FC<Props> = () => {
    return <div className={styles.wrapper}>One</div>
}

export default One
