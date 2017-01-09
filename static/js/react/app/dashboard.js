var React = require('react');
var ReactDOM = require('react-dom');
var LineChart = require("react-chartjs").Line;


var MyComponent = React.createClass({
  render: function() {
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40],
                spanGaps: false,
            }
        ]
    };
    var chartOptions = null;
    return <LineChart data={data} options={chartOptions} width="600" height="250" redraw/>
  }
});

var FixesCard = React.createClass({
  render: function(){
    return <div class="col-lg-3 col-sm-6">
            <div class="card">
              <div class="content">
                <div class="row">
                  <div class="col-xs-5">
                    <div class="icon-big icon-success text-center">
                      <i class="ti-wallet"></i>
                    </div>
                  </div>
                  <div class="col-xs-7">
                    <div class="numbers">
                      <p>Revenue</p>
                      $1,345
                    </div>
                  </div>
                </div>
                <div class="footer">
                  <hr />
                  <div class="stats">
                    <i class="ti-calendar"></i> Last day
                  </div>
                </div>
              </div>
            </div>
          </div>
  }
})

var CapsulesCard = React.createClass({
  render: function(){
    return <div class="col-lg-3 col-sm-6">
            <div class="card">
              <div class="content">
                <div class="row">
                  <div class="col-xs-5">
                    <div class="icon-big icon-warning text-center">
                      <i class="ti-server"></i>
                    </div>
                  </div>
                  <div class="col-xs-7">
                    <div class="numbers">
                      <p>Creditos</p>
                      105GB
                    </div>
                  </div>
                </div>
                <div class="footer">
                  <hr />
                  <div class="stats">
                    <i class="ti-reload"></i> Updated now
                  </div>
                </div>
              </div>
            </div>
          </div>
  }
})


var ActivityPlot = React.createClass({
  render: function(){
    return <div class="col-md-12">
            <div class="card">
              <div class="header">
                <h4 class="title">Users Behavior</h4>
                <p class="category">24 Hours performance</p>
              </div>
              <div class="content">
                <div id="chartHours" class="ct-chart"></div>
                <div class="footer">
                  <div class="chart-legend">
                    <i class="fa fa-circle text-info"></i> Open
                    <i class="fa fa-circle text-danger"></i> Click
                    <i class="fa fa-circle text-warning"></i> Click Second Time
                  </div>
                  <hr />
                  <div class="stats">
                    <i class="ti-reload"></i> Updated 3 minutes ago
                  </div>
                </div>
              </div>
            </div>
          </div>
  }
})


var ContainerDashboard = React.createClass({
  render: function(){
    return <div class="content">
            <div class="container-fluid">
              <div class="row">
                <CapsulesCard />
                <FixesCard />
              </div>
              <div class="row">
                <MyComponent />
              </div>
            </div>
          </div>
  }
})



module.exports = ContainerDashboard;
