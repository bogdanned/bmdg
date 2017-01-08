var React = require('react');
var ReactDOM = require('react-dom');

var ContainerSideBar = React.createClass({
  render: function(){
    return <div class="sidebar" data-background-color="white" data-active-color="danger">
            <div class="sidebar-wrapper">
                <div class="logo">
                    <a href="" class="simple-text">
                        {this.props.customer ? <img class="img img-responsive"  src={this.props.customer.image}/> : null}
                    </a>
                </div>
                <div class="row">
                  <div class="col-md-12">
                      {this.props.customer ?
                        <p>Creditos : {this.props.customer.credits} </p>
                      : null}
                  </div>
                  <div class="col-md-12">
                    <p>
                      Subscription : null
                    </p>
                  </div>
                </div>

                <ul class="nav">
                    <li>
                        <a onClick={this.props.displayContainerDashboard}>
                            <i class="ti-panel"></i>
                            <p>Vista General</p>
                        </a>
                    </li>
                    <li>
                        <a onClick={this.props.displayContainerProfile}>
                            <i class="ti-user"></i>
                            <p>Mi Perfil</p>
                        </a>
                    </li>
                    <li>
                        <a onClick={this.props.displayContainerFixes}>
                            <i class="ti-view-list-alt "></i>
                            <p>Cambios</p>
                        </a>
                    </li>
                    <li class="active">
                        <a onClick={this.props.displayContainerCapsules}>
                            <i class="ti-view-list-alt"></i>
                            <p>Capsulas</p>
                        </a>
                    </li>
                    <li>
                        <a onClick={this.props.displayContainerBilling}>
                            <i class="ti-text"></i>
                            <p>Mis Facturas</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
  }
})


module.exports = ContainerSideBar;
