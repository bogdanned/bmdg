import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from 'react-bootstrap'


export default class ContainerFooter extends React.Component{
  render(){
    return <Col md={12} className="col-footer">
            <p>Made with <i className="icon ion-ios-heart red"/> in Madrid by BMDG <span>PARTNERS</span>
            </p>
           </Col>
  }
}


export { ContainerFooter }
