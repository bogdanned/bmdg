var React = require('react');
var ReactDOM = require('react-dom');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;
var cookie = require('react-cookie');
var request = require('superagent');
var Form = require('react-bootstrap').Form;
var Col = require('react-bootstrap').Col;
var FormControl = require('react-bootstrap').FormControl;
var ControlLabel = require('react-bootstrap').ControlLabel;
var HelpBlock = require('react-bootstrap').HelpBlock;
var FormGroup = require('react-bootstrap').FormGroup;
var Glyphicon = require('react-bootstrap').Glyphicon;
var creditcardutils = require('creditcardutils');
var Image = require('react-bootstrap').Image;


var PaymentForm = React.createClass({
  mixins: [ ReactScriptLoaderMixin ],
  getInitialState: function() {
    return {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null,
      key: null,
      cvv: '',
      year: '',
      month: '',
      date_full: '',
      card_number: '',
      card_name: '',
      date_backspace: false,
    };
  },
  payBottonDisable: function(){
    this.setState({
      submitDisabled: true,
    });
  },
  getCVVValidationState() {
    var status = creditcardutils.validateCardCVC(this.state.cvv);
    if (status) return 'success';
    else return 'error';
  },
  getDateValidationState() {
    var length = this.state.date_full.length;
    if (length < 5) return 'error';
    else if (length > 5) return 'error';
    else if (length == 5) return 'success';
  },
  getCardNumberValidationState() {
    var length = this.state.date_full;
    var status = creditcardutils.validateCardNumber(this.state.card_number); //=> true
    if (status) return 'success';
    else return 'error';
  },
  onChangeCVV: function(e){
    console.log(e.target.value.length);
    if (e.target.value.length < 4){
      this.setState({ cvv: e.target.value });
    }else if (e.target.value.length > 3){
      console.log('skip change');
      e.preventDefault();
    }
  },
  onChangeCardNumber: function(e){
    if (e.target.value.length < 20){
      var card_number = creditcardutils.formatCardNumber(e.target.value);
      var card_type = creditcardutils.parseCardType(e.target.value);
      this.setState(
        {card_number: card_number}
      );
    }
  },
  onChangeDate: function(e){
    var year = '';
    var month = '';
    console.log("onChangeDate");
    var date_full = e.target.value;
    if (!this.state.date_backspace){
      if (date_full.length == 2){
        date_full = date_full + "/";
        this.setState({
          date_full: date_full,
          date_backspace: false,
        });
      }else if (date_full.length == 5){
        month = date_full.charAt(0) +  date_full.charAt(1);
        year = date_full.charAt(3) + date_full.charAt(4);
        this.setState({
          date_full: date_full,
          date_backspace: false,
          year: year,
          month: month,
        });
      }else if(date_full.length > 5){
        e.preventDefault();
      }else{
        this.setState({
          date_full: date_full,
          date_backspace: false,
        });
      }
    }else{
      this.setState({
        date_full: date_full,
        date_backspace: false,
      });
    }
  },
  getScriptURL: function() {
    return 'https://js.stripe.com/v2/';
  },
  getPublishableKey: function() {
    csrftoken = cookie.load('csrftoken');
    self = this;
    request.get("/payment/get-key")
           .set('Accept', 'application/json')
           .set("X-CSRFToken", csrftoken)
           .end(function(err, res){
             key_object = JSON.parse(res.text);
             self.setState({
               key: key_object.key,
             });
           })
  },
  _handleKeyDownDate: function(e){
    if (e.key === 'Backspace') {
      var date_full = e.target.value;
      this.setState({
        date_full: date_full,
        date_backspace: true,
      });
    }
  },
  onScriptLoaded: function() {
    console.log(this.state.key);
    if (!PaymentForm.getStripeToken) {
      // Put your publishable key here
      Stripe.setPublishableKey(this.state.key);
      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  },
  componentDidMount: function(){
    this.getPublishableKey();
  },
  onScriptError: function() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  },
  onSubmit: function(event) {
    var self = this;
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });
    // send form here
    Stripe.createToken(event.target, function(status, response) {
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false });
      }
      else {
        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
        self.sendPaymentToken();
      }
    });
  },
  sendPaymentToken: function(){
    csrftoken = cookie.load('csrftoken');
    self = this;
    //Prop Amount passed here by parent element
    request.post("/payment/charge")
           .set('Accept', 'application/json')
           .set("X-CSRFToken", csrftoken)
           .send({
             token: self.state.token,
             amount: self.props.amount,
           })
           .end(function(err, res){

           })
  },
  render: function() {
    if (this.state.stripeLoading) {
      return <div>Loading</div>;
    }
    else if (this.state.stripeLoadingError) {
      return <div>Error</div>;
    }
    else if (this.state.paymentComplete) {
      return <div>Payment Complete!</div>;
    }
    else {
      return  <Form onSubmit={this.onSubmit}>
                <span>{ this.state.paymentError }</span>
                <br />


                <Col sm={12}>
                  <FormGroup
                    bsSize="small"
                    validationState={this.getCardNumberValidationState()}
                    onChange={this.onChangeCardNumber}>
                    <ControlLabel>Nombre del Titular</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Nombre"
                        value={this.state.card_name}/>
                  </FormGroup>
                </Col>

                <Col sm={12}>
                  <FormGroup
                    bsSize="small"
                    validationState={this.getCardNumberValidationState()}
                    onChange={this.onChangeCardNumber}>
                    <ControlLabel>Numero Tarjeta</ControlLabel>
                    <FormControl
                        type="text"
                        data-stripe='number'
                        placeholder="0567 890 0987 5673"
                        value={this.state.card_number}/>
                  </FormGroup>
                </Col>


                <Col sm={6}>
                  <FormGroup
                     bsSize="small"
                     onKeyDown={ this._handleKeyDownDate }
                     onChange={this.onChangeDate}
                     validationState={this.getDateValidationState()}
                    >
                    <ControlLabel>Fecha Caducidad</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="09/21"
                      value={this.state.date_full}/>
                  </FormGroup>
                </Col>
                <Col sm={6}>
                  <FormGroup
                    bsSize="small"
                    validationState={this.getCVVValidationState()}
                    onChange={this.onChangeCVV}>
                    <ControlLabel>CVV</ControlLabel>
                    <FormControl
                      type="text"
                      data-stripe='cvc'
                      placeholder="CVV"
                      value={this.state.cvv} />
                  </FormGroup>
                </Col>



                <FormGroup
                   bsSize="small"
                   onKeyDown={ this._handleKeyDownDate }
                   onChange={this.onChangeDate}
                   validationState={this.getDateValidationState()}
                  >
                  <FormControl
                    type='hidden'
                    id='exp-month'
                    data-stripe='exp-month'
                    value={this.state.month}/>
                    <FormControl
                      type='hidden'
                      id='exp-year'
                      data-stripe='exp-year'
                      value={this.state.year}/>
                </FormGroup>
                <Col sm={12}>
                  <Image src="./static/img/stripe.png" responsive />
                </Col>
                <input
                  disabled={this.state.submitDisabled}
                  type='submit'
                  value='Pagar'
                  class="btn btn-cta pull-right"/>


              </Form>
    }
  }
});


module.exports = PaymentForm;
