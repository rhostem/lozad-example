// @flow
import * as React from 'react'

type Props = {}
type State = {}

class Component extends React.Component {
  props: Props
  state: State
  static defaultProps = {}

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    return <div>Component</div>
  }
}

export default Component
