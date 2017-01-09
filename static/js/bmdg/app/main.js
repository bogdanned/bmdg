import React from 'react'
import ReactDOM from 'react-dom'
import CapsuleView from './components/capsulesContainer'
import capsulesStore from './stores/capsulesStore'


const app = document.getElementById("app")


ReactDOM.render(<CapsuleView capsulesStore={capsulesStore} />, app)
