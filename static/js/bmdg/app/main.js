import React from 'react'
import Tether from 'react-tether'
import ReactDOM from 'react-dom'
import { Route, Router, IndexRoute, hashHistory}  from 'react-router'
import ContainerCapsules from './components/containerCapsules'
import ContainerSideBar from './components/containerSideBar'
import ContainerProfile from './components/containerProfile'
import ContainerFixes from './components/containerFixes'
import ContainerDashboard from './components/ContainerDashboard'
import CapsulesStore from './stores/capsulesStore'
import CustomerStore from './stores/customerStore'
import FixesStore from './stores/fixesStore'
import * as customerActions from './actions/customerActions'
import { observer } from 'mobx-react'


const app = document.getElementById("body-main")


class WrapperContainerCapsules extends React.Component{
  render() {
    return <ContainerCapsules
            capsulesStore={CapsulesStore}
            customerStore={CustomerStore} />
  }
}


@observer
class WrapperContainerDashboard extends React.Component{
  render() {
    return <div className="container-fluid container-dashboard">
            <ContainerDashboard/>
          </div>
  }
}


@observer
class WrapperContainerProfile extends React.Component{
  render() {
    return <ContainerProfile />
  }
}


class WrapperContainerFixes extends React.Component{
  render() {
    return <ContainerFixes
            customerStore={CustomerStore}
            fixesStore={FixesStore}
            />
  }
}



class MainPanelRouter extends React.Component {
  componentDidMount(){
    customerActions.getCustomer()
  }
  render() {
    return <Router history={hashHistory}>
            <Route
              path="/"
              component={ContainerSideBar}>
              <IndexRoute component={WrapperContainerFixes} />
              <Route
                path="capsules"
                component={WrapperContainerCapsules}>
              </Route>
              <Route
                path="profile"
                component={WrapperContainerProfile}>
              </Route>
              <Route
                path="fixes"
                component={WrapperContainerFixes}>
              </Route>
              <Route
                path="dashboard"
                component={WrapperContainerDashboard}>
              </Route>
            </ Route>
           </ Router>
  }
}


ReactDOM.render(<MainPanelRouter />, app)
