import React from 'react'
import ReactDOM from 'react-dom'
import CapsulesContainer from './components/capsulesContainer'
import capsulesStore from './stores/capsulesStore'


const app = document.getElementById("body-main")


ReactDOM.render(<CapsulesContainer capsulesStore={capsulesStore} />, app)
