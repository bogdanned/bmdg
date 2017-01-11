import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, IndexRoute, hashHistory}  from 'react-router'
import ContainerCapsules from './components/containerCapsules'
import ContainerSideBar from './components/containerSideBar'
import ContainerProfile from './components/containerProfile'
import ContainerFixes from './components/containerFixes'
import CapsulesStore from './stores/capsulesStore'
import CustomerStore from './stores/customerStore'


const app = document.getElementById("body-main")

class WrapperContainerCapsules extends React.Component{
  render() {
    return <ContainerCapsules
            capsulesStore={CapsulesStore}
            customerStore={CustomerStore} />
  }
}

class WrapperContainerProfile extends React.Component{
  render() {
    return <ContainerProfile
            customerStore={CustomerStore} />
  }
}

class WrapperContainerFixes extends React.Component{
  render() {
    return <ContainerFixes
            customerStore={CustomerStore}
            />
  }
}



class MainPanelRouter extends React.Component {
  render() {
    return <Router history={hashHistory}>
            <Route
              path="/"
              component={ContainerSideBar}>
              <IndexRoute component={WrapperContainerCapsules} />
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
            </ Route>
           </ Router>
  }
}


ReactDOM.render(<MainPanelRouter />, app)
