import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    ON_SUCCESS_BUY_USER,
    UPDATE_DATA_USER,
    CLEAR_UPDATE_USER_DATA
} from '../actions/types';


export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        //loginSuccess - as written in server login
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state } 
        case ADD_TO_CART_USER:
            return {...state, userData:{
                ...state.userData,
                cart: action.payload
                //cart is used to grab info in ./components/user/cart.js
            }
        }  
        case GET_CART_ITEMS_USER:
            return {...state ,cartDetail: action.payload }
            //cartDetails is used in cart.js  
          
        case REMOVE_CART_ITEM_USER:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData:{
                    ...state.userData,
                    cart: action.payload.cart
                }
            }  
        case ON_SUCCESS_BUY_USER:
            return {
                //...state:returns previous state original then below return return the updated state
                ...state,
                //in action, ON_SUCCESS_BUY_USER returns success .therefore action.payload.success
                successBuy: action.payload.success,
                //below userData we get from above case, so make the cart empty therefore action.payload.cart return empty cart from action.js
                userData:{
                    ...state.userData,
                    cart: action.payload.cart
                },
                cartDetail: action.payload.cartDetail
            } 
        case UPDATE_DATA_USER:
            return {...state,updateUser: action.payload}
        case CLEAR_UPDATE_USER_DATA:
            return {...state,updateUser: action.payload}         
        default:
            return state;
    }
}