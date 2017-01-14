import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import * as customerActions from '../actions/customerActions'
import { customerStore } from '../stores/customerStore'
import { Link }  from 'react-router'
import { ContainerFooter } from './containerFooter'


@observer
export default class ContainerSideBar extends React.Component{
  render(){
    return <div className="wrapper">
              <div className="sidebar" data-background-color="white" data-active-color="danger">
                      <div className="sidebar-wrapper">
                          <div className="logo">
                              <a href="" className="simple-text">
                                <img src={customerStore.customer.image} />
                              </a>
                          </div>
                          <div className="row row-stats">
                            <div className="col-md-12 credit-bar">
                              <div id="credits-icon">
                                <i className="ion ion-ionic"/>
                              </div>
                              <div id="credits-text-container">
                                <p id="p-credits">{customerStore.customer.credits} </p>
                                <p>Creditos</p>
                              </div>
                            </div>
                            <div className="col-md-12">
                            </div>
                          </div>
                          <ul className="nav">
                              <li>
                                <Link activeClassName="active" to="fixes">
                                  <i className="icon ion-grid"></i>
                                  <p>Tareas</p>
                                </Link>
                              </li>
                              <li>
                                <Link activeClassName="active" to="capsules">
                                  <i className="icon ion-planet"></i>
                                  <p>Capsulas</p>
                                </Link>
                              </li>
                              <li>
                                <Link activeClassName="active" to="billing">
                                  <i className="icon ion-ios-list-outline"></i>
                                  <p>Facturas</p>
                                </Link>
                              </li>
                              <li>
                                <Link activeClassName="active" to="profile">
                                  <i className="icon ion-person"></i>
                                  <p>Mi Perfil</p>
                                </Link>
                              </li>
                              <li>
                                <a href="/accounts/logout/">
                                  <i className="icon ion-power"></i>
                                  <p>Salir</p>
                                </a>
                              </li>
                              <ContainerFooter />
                          </ul>
                      </div>
                  </div>
                    <div className="main-panel">
                      {this.props.children}
                    </div>
                 </div>
  }
}
