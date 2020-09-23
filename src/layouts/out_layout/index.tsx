import React from 'react'

type Props = {}

type State = {}

class OutLayout extends React.PureComponent<Props, State> {
    render() {
        return <>{this.props.children}</>
    }
}

export default OutLayout
