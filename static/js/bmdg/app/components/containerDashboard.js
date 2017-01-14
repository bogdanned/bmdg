import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import { Row, Col } from 'react-bootstrap'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'
import * as pageInsightsActions from '../actions/pageInsightsActions'
import { customerStore } from '../stores/customerStore'




class ListExampleSettings extends React.Component{
  render(){
    return   <div style={styles.root}>
          <List>
            <Subheader>General</Subheader>
            <ListItem
              primaryText="Profile photo"
              secondaryText="Change your Google+ profile photo"
            />
            <ListItem
              primaryText="Show your status"
              secondaryText="Your status is visible to everyone you use with"
            />
          </List>
          <Divider />
          <List>
            <Subheader>Hangout Notifications</Subheader>
            <ListItem
              leftCheckbox={<Checkbox />}
              primaryText="Notifications"
              secondaryText="Allow notifications"
            />
            <ListItem
              leftCheckbox={<Checkbox />}
              primaryText="Sounds"
              secondaryText="Hangouts message"
            />
            <ListItem
              leftCheckbox={<Checkbox />}
              primaryText="Video sounds"
              secondaryText="Hangouts video call"
            />
          </List>
          <List>
            <ListItem
              primaryText="When calls and notifications arrive"
              secondaryText="Always interrupt"
            />
          </List>
          <Divider />
          <List>
          <Subheader>Priority Interruptions</Subheader>
            <ListItem primaryText="Events and reminders" rightToggle={<Toggle />} />
            <ListItem primaryText="Calls" rightToggle={<Toggle />} />
            <ListItem primaryText="Messages" rightToggle={<Toggle />} />
          </List>
          <Divider />
          <List>
            <Subheader>Hangout Notifications</Subheader>
            <ListItem primaryText="Notifications" leftCheckbox={<Checkbox />} />
            <ListItem primaryText="Sounds" leftCheckbox={<Checkbox />} />
            <ListItem primaryText="Video sounds" leftCheckbox={<Checkbox />} />
          </List>
          </div>
  }
}


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


export class DividerExampleList extends React.Component{
  render(){
    return <div>
            <List>
              <ListItem insetChildren={true} primaryText="Janet Perkins Bennet" />
              <ListItem insetChildren={true} primaryText="Peter Carlsson" />
            </List>
            <Divider inset={true} />
            <List>
              <ListItem insetChildren={true} primaryText="Aaron Bennet" />
              <ListItem insetChildren={true} primaryText="Abbey Christensen" />
            </List>
          </div>
  }
}


class CardPageInsight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange(expanded){
    this.setState({expanded: expanded})
  };

  handleToggle(event, toggle){
    this.setState({expanded: toggle})
  };

  handleExpand() {
    this.setState({expanded: true})
  };

  handleReduce(){
    this.setState({expanded: false})
  };
  componentDidMount(){
    pageInsightsActions.getPageInsightsLatest()
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange.bind(this)}>
          <CardHeader
            title="Velocidad Web"
            subtitle="Subtitle"
            icon={<i className='icon ion-ios-speedometer-outline'/>}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText>
            <Toggle
              toggled={this.state.expanded}
              onToggle={this.handleToggle.bind(this)}
              labelPosition="right"
              label="This toggle controls the expanded state of the component."
            />
          </CardText>
          <CardTitle title="Velocidad Web" subtitle="Card subtitle" expandable={true} />
          <CardText expandable={true}>
            <h3>Score</h3>
            <h3>{customerStore.pageInsights.score}</h3>
          </CardText>
          <CardActions>
            <FlatButton label="Saber Más" onTouchTap={this.handleExpand.bind(this)} />
            <FlatButton label="Cerrar" onTouchTap={this.handleReduce.bind(this)} />
          </CardActions>
        </Card>
      </MuiThemeProvider>

    );
  }
}


class CardExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {
    return (
      <MuiThemeProvider>
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
            title="URL Avatar"
            subtitle="Subtitle"
            avatar="<i class='icon ion-ios-speedometer-outline'/>"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText>
            <Toggle
              toggled={this.state.expanded}
              onToggle={this.handleToggle}
              labelPosition="right"
              label="This toggle controls the expanded state of the component."
            />
          </CardText>
          <CardMedia
            expandable={true}
            overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
          >
            <img src="images/nature-600-337.jpg" />
          </CardMedia>
          <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
          <CardText expandable={true}>
            <ListExampleSettings />
          </CardText>
          <CardActions>
            <FlatButton label="Expand" onTouchTap={this.handleExpand} />
            <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}


@observer
export default class ContainerDashboard extends React.Component{
  render(){
    return <div>
            <Row>
              <Col md={4}>
                <CardExampleControlled />
              </Col>
              <Col md={4}>
                <CardExampleControlled />
              </Col>
              <Col md={4}>
                <CardExampleControlled />
              </Col>
              </Row>
              <Row>
              <Col md={4}>
                <CardPageInsight />
              </Col>
              <Col md={4}>
                <CardExampleControlled />
              </Col>
              <Col md={4}>
                <CardExampleControlled />
              </Col>
            </Row>
          </div>
  }
}

export { ContainerDashboard }
