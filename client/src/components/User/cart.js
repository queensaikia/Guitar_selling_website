import React, { Component } from 'react'
import { connect } from 'react-redux';
import UserLayout from '../../hoc/user';
import UserProductBlock from '../utils/User/product_block';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'
import { getCartItems, removeCartItem, onSuccessBuy} from '../../actions/user_actions';
import Paypal from '../utils/paypal';


//AaVDfAcSTrACgJbQfhfN6f-hda0fCv_mF9z_Z1L7jHOiDFC0g6zngbD9Q7Y2DZA3bmNpJygkg0h6uyhA

class UserCart extends Component {

    state = {
        loading: true,
        total:0,
        showTotal: false,
        showSuccess: false,
    }

    componentDidMount(){
        let cartItems = [];
        let user = this.props.user;
        //this.props.user=> grab info from user model
        
        //below .cart is used to grab cart info from user_reducer ADD_TO_CART_USER stored in cart. 
        if(user.userData.cart){
            if(user.userData.cart.length > 0){
                user.userData.cart.forEach(item=>{
                    cartItems.push(item.id)
                    //pushes the items in cartItems in above state from user_reducer ADD_TO_CART_USER
                });
                this.props.dispatch(getCartItems(cartItems,user.userData.cart))
                .then(()=>{
                    if(this.props.user.cartDetail.length > 0){
                        this.calculateTotal(this.props.user.cartDetail);
                        //cartDetail we grab the data from GET_CART_ITEMS_USER user_reducer
                    }
                })
            }
        }
    }

    calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.forEach(item=>{
            total += parseInt(item.price, 10) * item.quantity
        });

        this.setState({
            total,
            showTotal: true
        });
    }

    removeFromCart = (id) => {
        this.props.dispatch(removeCartItem(id))
        .then(()=>{
            if(this.props.user.cartDetail.length <= 0){
                //if no items in the cart no state of show total
                this.setState({
                    showTotal: false
                })
            } else{
                //if there is any item then call the calcuateTotal function and recalculate the total amount
                this.calculateTotal(this.props.user.cartDetail)
            }
        })
    }

    showNoItemMessage = () =>(
        <div className="cart_no_items">
            <FontAwesomeIcon icon={faFrown}/>
            <div>
                You have no items
            </div>
        </div>
    )

    transactionError = (data) => {
        console.log('Paypal error')
    }
    
    transactionCanceled = () => {
        console.log('Transaction cancelled')
    }

    transactionSuccess = (data) => {
        this.props.dispatch(onSuccessBuy({
            cartDetail: this.props.user.cartDetail,
            //cartDetail and paymentData from server.js /users/successBuy
            paymentData: data
        })).then(()=>{
            //successBuy = true from user_reducer
            if(this.props.user.successBuy){
                this.setState({
                    showTotal: false,
                    showSuccess: true
                })
            }
        })
    }

            

    render() {
        return (
                <UserLayout>
                    <div>
                        <h1>My cart</h1>
                        <div className="user_cart">
                            <UserProductBlock
                                products={this.props.user}
                                type="cart"
                                removeItem={(id)=> this.removeFromCart(id)}
                            />
                            { this.state.showTotal ?
                            <div>
                                <div className="user_cart_sum">
                                    <div>
                                        Total amount: $ {this.state.total}
                                    </div>
                                </div>
                            </div>
                            :

                              this.state.showSuccess ?
                                <div className="cart_success">
                                    <FontAwesomeIcon icon={faSmile}/>
                                    <div>
                                        THANK YOU
                                    </div>
                                    <div>
                                        YOUR ORDER IS NOW COMPLETE
                                    </div>
                                </div>
                            
                        :
                        this.showNoItemMessage()
                        }
                    
                            </div>
                            {
                        this.state.showTotal ?
                            <div className="paypal_button_container">
                          
                                <Paypal
                                    toPay={this.state.total}
                                    transactionError={(data)=> this.transactionError(data)}
                                    transactionCanceled={(data)=> this.transactionCanceled(data)}
                                    onSuccess={(data)=> this.transactionSuccess(data)}
                                />
                            </div>
                        :null

                    }
            </div>
            </UserLayout>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserCart);