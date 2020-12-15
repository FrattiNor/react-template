import React, { FC, useState } from 'react'

type Props = {}

const Two: FC<Props> = () => {
    const [count, setCount] = useState(0)

    return <div onClick={() => setCount(count + 1)}>{count}</div>
}

export default Two
