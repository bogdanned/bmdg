import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { ReactScriptLoaderMixin } from 'react-script-loader'
import * as BootStrap from 'react-bootstrap'
import { Col, Row, Panel, ListGroup, ListGroupItem,
         Label, ProgressBar, Botton, Form, FormGroup,
         HelpBlock, FormControl, ControlLabel, Image
       } from 'react-bootstrap'
import cookie from 'react-cookie'
import request from 'superagent'
import creditcard from 'creditcardutils'


export default class PaymentForm extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
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
   }
 }
 payBottonDisable(){
   this.setState({
     submitDisabled: true,
   })
 }
 getCVVValidationState() {
   var status = creditcard.validateCardCVC(this.state.cvv)
   if (status) return 'success'
   else return 'error'
 }
 getDateValidationState() {
   var length = this.state.date_full.length
   if (length < 5) return 'error'
   else if (length > 5) return 'error'
   else if (length == 5) return 'success'
 }
 getCardNumberValidationState() {
   var length = this.state.date_full
   var status = creditcard.validateCardNumber(this.state.card_number) //=> true
   if (status) return 'success'
   else return 'error'
 }
 onChangeCVV(e) {
   if (e.target.value.length < 4){
     this.setState({ cvv: e.target.value })
   }else if (e.target.value.length > 3){
     e.preventDefault()
   }
 }
 onChangeCardNumber(e) {
   if (e.target.value.length < 20){
     var card_number = creditcard.formatCardNumber(e.target.value)
     var card_type = creditcard.parseCardType(e.target.value)
     this.setState(
       {card_number: card_number}
     )
   }
 }
 onChangeDate(e) {
   var year = ''
   var month = ''
   var date_full = e.target.value
   if (!this.state.date_backspace){
     if (date_full.length == 2){
       date_full = date_full + "/"
       this.setState({
         date_full: date_full,
         date_backspace: false,
       })
     }else if (date_full.length == 5){
       month = date_full.charAt(0) +  date_full.charAt(1)
       year = date_full.charAt(3) + date_full.charAt(4)
       this.setState({
         date_full: date_full,
         date_backspace: false,
         year: year,
         month: month,
       })
     }else if(date_full.length > 5){
       e.preventDefault()
     }else{
       this.setState({
         date_full: date_full,
         date_backspace: false,
       })
     }
   }else{
     this.setState({
       date_full: date_full,
       date_backspace: false,
     })
   }
 }
 getScriptURL() {
   return 'https://js.stripe.com/v2/'
 }
 getPublishableKey() {
   const csrftoken = cookie.load('csrftoken')
   self = this
   request.get("/payment/get-key")
          .set('Accept', 'application/json')
          .set("X-CSRFToken", csrftoken)
          .end((err, res) => {
            const key_object = JSON.parse(res.text)
            self.setState({
              key: key_object.key,
            })
          })
 }
 _handleKeyDownDate(e) {
   if (e.key === 'Backspace') {
     var date_full = e.target.value
     this.setState({
       date_full: date_full,
       date_backspace: true,
     })
   }
 }
 componentDidMount(){
   this.getPublishableKey()
 }
 onSubmit(event) {
   var self = this
   event.preventDefault()
   this.setState({ submitDisabled: true, paymentError: null })
   // send form here
   Stripe.createToken(event.target, (status, response) => {
     if (response.error) {
       self.setState({ paymentError: response.error.message, submitDisabled: false })
     }
     else {
       self.setState({ paymentComplete: true, submitDisabled: false, token: response.id })
       self.sendPaymentToken()
     }
   })
 }
 sendPaymentToken(){
   csrftoken = cookie.load('csrftoken')
   self = this
   //Prop Amount passed here by parent element
   request.post("/payment/charge")
          .set('Accept', 'application/json')
          .set("X-CSRFToken", csrftoken)
          .send({
            token: self.state.token,
            amount: self.props.amount,
          })
          .end((err, res) => {

          })
 }
 render() {
   if (this.state.paymentComplete) {
     return <div>Payment Complete!</div>
   }
   else {
     return  <Form onSubmit={this.onSubmit.bind(this) }>
               <span>{ this.state.paymentError }</span>
               <br />


               <Col sm={12}>
                 <FormGroup
                   bsSize="small"
                   validationState={this.getCardNumberValidationState()}
                   onChange={this.onChangeCardNumber.bind(this)}>
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
                   onChange={this.onChangeCardNumber.bind(this) }>
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
                    onKeyDown={ this._handleKeyDownDate.bind(this) }
                    onChange={this.onChangeDate.bind(this)}
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
                   onChange={this.onChangeCVV.bind(this)}>
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
                  onChange={this.onChangeDate.bind(this)}
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
                 className="btn btn-cta pull-right"/>
             </Form>
   }
 }
}

export { PaymentForm }
