import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';

//if login then go to dashoard authentication..
export default function(ComposedClass,reload,adminRoute = null){
    class AuthenticationCheck extends Component {

        state = {
            loading: true
        }
//dispatch an action to auth
        //reload is the true or false null in route 

        componentDidMount(){
            this.props.dispatch(auth()).then(response =>{
                let user = this.props.user.userData;
              //if not login return regidter_login page
                if(!user.isAuth){
                    if(reload){
                        this.props.history.push('/register_login')
                    }
                }
                //if admin return dashboard
                 else{
                    if(adminRoute && !user.isAdmin){
                        this.props.history.push('/user/dashboard')
                    } else{
                        if(reload === false){
                            this.props.history.push('/user/dashboard')
                        }
                    }
                }
                this.setState({loading:false})
            })
        }



        render() {
            if(this.state.loading){
                return (
                    <div className="main_loader">
                        <CircularProgress style={{color:'#2196F3'}} thickness={7}/> 
                    </div>
                )
            }
            return (
               <ComposedClass {...this.props} user={this.props.user}/>
            );
        }
    }

    function mapStateToProps(state){
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)
}
