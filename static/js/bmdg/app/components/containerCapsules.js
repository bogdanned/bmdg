import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import * as capsulesActions from '../actions/capsulesActions'
import * as customerActions from '../actions/customerActions'
import { Col,
         Row,
         Panel,
         ListGroup,
         ListGroupItem,
         Label,
         ProgressBar,
         Modal,
         Button
       } from 'react-bootstrap'
import { CapsuleApproved } from './capsules/capsuleApproved'


class CapsuleFixesList extends React.Component{
  render() {
    if (!this.props.fixes || this.props.fixes.length == 0){
      return <p></p>
    } else {
      var capsuleFixList = this.props.fixes.map(function(fix, index){
          return <ListGroupItem key={index}>
                  {fix.description}
                  <Label bsStyle="primary" className="pull-right">{fix.status}</Label>
                  {fix.credits ?
                    <Label bsStyle="primary" className="pull-right">Creditos:{fix.credits}</Label>
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
    var title = <div className="half-width">
                  <p className="p-item-description">Capsula {this.props.capsule.id}</p>
                  <p className="p-item-date"> {this.props.capsule.created} {this.props.capsule.status}</p>
                </div>
    return <div className="col-sm-6 col-md-12">
             <Panel collapsible header={title} bsStyle="danger" bsSize="small">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
             </Panel>
           </div>
  }
}

class CapsuleDone extends React.Component{
  render(){
    var title = <div className="half-width">
                  <p className="p-item-description">Capsula {this.props.capsule.id}</p>
                  <p className="p-item-date"> {this.props.capsule.created} {this.props.capsule.status}</p>
                </div>
    return <div className="col-sm-6 col-md-12">
             <Panel collapsible header={title} bsStyle="warning">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
             </Panel>
           </div>
  }
}


class CapsuleDevelopment extends React.Component{
  render() {
    const label = this.props.capsule.progress;
    var progressBar = <div>
                        <div className="half-width">
                          <p className="p-item-description">Capsula {this.props.capsule.id}</p>
                          <p className="p-item-date"> {this.props.capsule.created} {this.props.capsule.status} Tareas: {this.props.capsule.fixes.length}</p>
                        </div>
                        <div className="half-width">
                          <ProgressBar striped bsStyle="danger" now={this.props.capsule.progress}  label={`${label}%`} />
                        </div>
                      </div>
    return <div className="col-sm-6 col-md-12">
             <Panel collapsible defaultExpanded header={progressBar} bsStyle="success">
              <CapsuleFixesList key={this.props.capsule.id} fixes={this.props.capsule.fixes} />
             </Panel>
           </div>
  }
}


@observer
export default class ContainerCapsules extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount(){
    capsulesActions.getCapsules()
    customerActions.getCustomer()
  }
  render(){
    var capsulesRequestedList = this.props.capsulesStore.filterByStatus("REQUESTED").map(capsule => {
      return <CapsuleRequested
              key={capsule.id}
              capsule={capsule}
              />
    })
    var capsulesApprovedList = this.props.capsulesStore.filterByStatus("APPROVED").map(capsule => {
      return <CapsuleApproved
              key={capsule.id}
              capsule={capsule}
              />
    })
    var capsulesDoneList = this.props.capsulesStore.filterByStatus("DONE").map(capsule => {
      return <CapsuleDone
              key={capsule.id}
              capsule={capsule}
              />
    })
    var capsulesDevelopmentList = this.props.capsulesStore.filterByStatus("DEVELOPMENT").map(capsule => {
      return <CapsuleDevelopment
              key={capsule.id}
              capsule={capsule}
              />
    })
    return <div className="row full-heigh">
            <div className="col-fix-list col-md-12">
              <div className="row">
                  {capsulesRequestedList}
                </div>
                <div className="row">
                  {capsulesApprovedList}
                </div>
                <div className="row">
                  {capsulesDevelopmentList}
                </div>
                <div className="row">
                  {capsulesDoneList}
                </div>
            </div>
           </div>
  }
}
