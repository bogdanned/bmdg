import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import * as capsulesActions from '../actions/capsulesActions'
import { Col, Row, Panel, ListGroup, ListGroupItem, Label  } from 'react-bootstrap'


class CapsuleFixesList extends React.Component{
  render() {
    if (!this.props.fixes || this.props.fixes.length == 0){
      return <p></p>
    } else {
      var capsuleFixList = this.props.fixes.map(function(fix, index){
          return <ListGroupItem key={index}>
                  {fix.description}
                  <Label bsStyle="primary" class="pull-right">{fix.status}</Label>
                  {fix.credits ?
                    <Label bsStyle="primary" class="pull-right">Creditos:{fix.credits}</Label>
                  : null}

                 </ListGroupItem>
      })
      return <ListGroup fill>
              {capsuleFixList}
             </ListGroup>
    }
  }
}



class CapsuleRequested extends React.Component{
  render() {
    var title = <div class="half-width">
                  <p class="p-item-description">Capsula {this.props.capsule.id}</p>
                  <p class="p-item-date"> {this.props.capsule.created} {this.props.capsule.status}</p>
                </div>
    return <div class="col-sm-6 col-md-12">
             <Panel collapsible header={title} bsStyle="danger">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
             </Panel>
           </div>
  }
}


@observer
export default class CapsulesContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    capsulesActions.getCapsules()
  }
  render(){
    var capsulesRequestedList = this.props.capsulesStore.filterByStatus("REQUESTED").map(capsule => {
      return <CapsuleRequested
              key={capsule.id}
              capsule={capsule}
              />
    })
    var capsulesDoneList = this.props.capsulesStore.filterByStatus("DONE").map(capsule => {
      return <p key={capsule.id}> DONE:{capsule.id} </p>
    })
    return <div className="row full-heigh">
            <div className="col-fix-list col-md-12">
              <div className="row">
                  {capsulesRequestedList}
                </div>
                <div className="row">
                  {capsulesDoneList}
                </div>
            </div>
           </div>
  }
}
