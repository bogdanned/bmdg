import React from 'react'
import ReactDOM from 'react-dom'
import CapsulesContainer from './components/capsulesContainer'
import CapsulesStore from './stores/capsulesStore'
import CustomerStore from './stores/customerStore'

const app = document.getElementById("body-main")


ReactDOM.render(
    <CapsulesContainer
      capsulesStore={CapsulesStore}
      customerStore={CustomerStore}
    />,
app)
