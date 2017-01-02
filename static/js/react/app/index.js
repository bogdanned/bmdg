var React = require('react');
var ReactDOM = require('react-dom');
var forms = require('newforms')
var BootstrapForm = require('newforms-bootstrap')
var Tether = require('react-tether');


/* Forms Locale*/
forms.addLocale('es', {
  b: 'ene._feb._mar_abr._may_jun_jul._ago_sept._oct._nov._dec.'.split('_')
, B: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_')
, D: 'lunes_martes_miercoles_juesves_viernes_sabado_domingo'.split('_')
, DATE_INPUT_FORMATS: [
    '%d/%m/%Y', '%d/%m/%y'
  , '%d %b %Y', '%d %b %y'
  , '%d %B %Y', '%d %B %y',
  , '%m/%d/%Y',
  ]
, DATETIME_INPUT_FORMATS: [
    '%d/%m/%Y %H:%M:%S'
  , '%d/%m/%Y %H:%M'
  , '%D, %B %d , %H'
  , '%d/%m/%Y'
  , '%m/%d/%Y'
  , '%Y/%m/%d'
  , '%H:%M'
  ]
})
/* Setting Default Locale */
forms.setDefaultLocale('es');


/* Question Form START */
var AddFixForm = forms.Form.extend({
  title: forms.CharField({label: 'Titulo:', requiered: true, errorMessages: { required:'Se necesita un titulo.'}}),
  text: forms.CharField({label: 'Descripción:', requiered: true, errorMessages: { required:'Se necesita una descripción.'}}),
  url: forms.CharField({label: 'Url:', requiered: false}),
})
/* Question Form END */


/* Rendering the question form */
var FixesContainer = React.createClass({
  render: function() {
    return <div class="col-md-12 checkout-form-container">
              <h2 class="form-title">Pide tus cambios</h2>
                <form onSubmit={this._onSubmit} onChange={this._onFormChange}>
                <forms.RenderForm form={AddFixForm} ref="addFixForm">
                  <BootstrapForm />
                </forms.RenderForm>
                <button class="btn btn-primary pull-right">Añadir</button>
              </form>
              <div id="added-fixes">
              </div>
            </div>

  },
  componentDidMount: function() {
    var self = this;
  },
  componentWillUnmount: function() {
  },
  _onFormChange: function() {
    console.log('On changed called');
    var form = this.refs.addFixForm.getForm()
    var isValid = form.validate()
    if (isValid) {
      answer.innerHTML = form.cleanedData.question_text
    }
    this.forceUpdate();
  },
  _onSubmit: function(e){
    e.preventDefault()
    var form = this.refs.addFixForm.getForm()
    var isValid = form.validate()
    console.log('isValid')
    if (isValid) {
      var element = document.createElement("DIV");
      element.className = "row";
      element.innerHtml = "testing";
      document.getElementById('added-fixes').appendChild(element);

      console.log(form.cleanedData)
      /*
      answer = document.getElementById('container-form-container')
      console.log(form.cleanedData.question_text)
      //this.onSignup(form.cleanedData)
      url = 'https://0bd462af.ngrok.io/prediction?text="tengo%20una%20contractura%20muscular%20en%20el%20cuello"';
      $.ajax({
           url : url, // the endpoint
           type : "POST", // http method
           data : { }, // data sent with the post request

           // handle a successful response
           success : function(data) {
             console.log(data);
             if (data.result){

               answer.innerHTML = data.result[0].payload;

             }
           },

           // handle a non-successful response
           error : function(xhr,errmsg,err) {
               $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                   " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
               console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
           }
       });

    */

    }
  },
})



/* Rendering Container Form */
ReactDOM.render(
  <FixesContainer/>,
	document.getElementById('container-request-fix')
)
