import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import * as customerActions from '../actions/customerActions'
import { Link }  from 'react-router'


@observer
export default class MainPanel extends React.Component{
  render(){
    return <div className="wrapper">
              <div className="sidebar" data-background-color="white" data-active-color="danger">
                      <div className="sidebar-wrapper">
                          <div className="logo">
                              <a href="" className="simple-text">
                              </a>
                          </div>
                          <div className="row row-stats">
                            <div className="col-md-12 col-stats">

                            </div>
                            <div className="col-md-12">



                            </div>
                          </div>
                          <ul className="nav">
                              <li>
                                <Link activeClassName="active" to="profile">
                                  <i className="ti-user"></i>
                                  <p>Mi Perfil</p>
                                </Link>
                              </li>
                              <li>
                                <Link activeClassName="active" to="fixes">
                                  <i className="ti-view-list-alt "></i>
                                  <p>Cambios</p>
                                </Link>
                              </li>
                              <li>
                                <Link activeClassName="active" to="capsules">
                                  <i className="ti-layout-grid2"></i>
                                  <p>Capsulas</p>
                                </Link>
                              </li>
                              <li>
                                <Link activeClassName="active" to="billing">
                                  <i className="ti-text"></i>
                                  <p>Facturas</p>
                                </Link>
                              </li>
                          </ul>
                      </div>
                  </div>
                    <div className="main-panel">
                      {this.props.children}
                    </div>
                 </div>
  }
}
