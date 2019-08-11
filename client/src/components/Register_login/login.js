import React, { Component } from 'react'
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formactions';
import { withRouter } from 'react-router-dom';
//redux connect is used to check whether correct registered email and password or not
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions';


//updateform function contains onblur and the id of thr event.


//
//EXPORT WITH ROUTER IS USED IN THE BOTTOM SINCE IN SUBMIT FUNCTION PROPS.HISTORY.PUSH TO 
//ROUTE DASHBOARD IS NOT INCLUDED IN MAIN ROUTE.JS FILE.
//
class Login extends Component {

    state = {
        formError: false,
        formSuccess:'',
        formdata:{
            email: {
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            password: {
                element: 'input',
                value: '',
                config:{
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            }
        }
    }
    //
    //updateForm() calls outside function-update()in formactions and validates the 
    //form so that we get what is being typed.
    //
    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'login');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }
     //
    // AFTER SUBMIT PUSH TO NEW ROUTE BY THIS.PROPS.HISTORY.PUSH(ROUTE)
     //
    submitForm= (event) =>{
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata,'login');
        let formIsValid = isFormValid(this.state.formdata,'login')
      //loginUser function in user_actions
        if(formIsValid){
            this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
                 //
                //payload.loginSuccess- LoginSuccess because in server.js register route
                //it is written as LoginSuccess=true
                //
                if(response.payload.loginSuccess){
                    console.log(response.payload);
                    this.props.history.push('/user/dashboard')
                }else{
                    this.setState({
                        formError: true
                    })
                }
            });

        } else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event)=> this.submitForm(event)}>

                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=> this.updateForm(element)}
                    />

                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element)=> this.updateForm(element)}
                    />

                        { this.state.formError ?
                        <div className="error_label">
                            Please check your data
                        </div>
                    :null}
                    <button onClick={(event)=> this.submitForm(event)}>
                        Log in
                    </button>
                </form>
            </div>        
        );
    }
}

export default connect()(withRouter(Login));
