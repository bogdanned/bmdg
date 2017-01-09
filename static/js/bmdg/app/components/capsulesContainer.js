import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'

@observer
export default class CapsuleView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
  }
  createCapsule(){
  }
  render(){
    return <div>
            <h1>{this.props.capsulesStore.capsules[0]}</h1>
           </div>
  }
}
