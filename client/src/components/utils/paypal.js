import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
//paypal-express-checkout - react 3rd party libraby

class Paypal extends Component {
    render() {

        const onSuccess = (payment) =>{ 
            // //console.log(JSON.stringify(payment));
             this.props.onSuccess(payment);

             // { 
            //     "paid": true, 
            //     "cancelled": false, 
            //     "payerID": "3GFGQ6GNJ4PWA", 
            //     "paymentID": "PAY-0UB74233TB278434KLMYYMVY", 
            //     "paymentToken": "EC-2J270753AK460261B", 
            //     "returnUrl": "https://www.sandbox.paypal.com/?paymentId=PAY-0UB74233TB278434KLMYYMVY&token=EC-2J270753AK460261B&PayerID=3GFGQ6GNJ4PWA", 
            //     "address": { 
            //         "recipient_name": "test buyer", 
            //         "line1": "1 Main St", 
            //         "city": "San Jose", 
            //         "state": "CA", 
            //         "postal_code": "95131", 
            //         "country_code": "US" 
            //     }, 
            //     "email": "queensaikia19@gmail.com-buyer@gmail.com" 
            // }


        }

        const onCancel = (data) =>{
            // console.log(JSON.stringify(data))
        }

        const onError = (err) => {
            // console.log(JSON.stringify(err))
        }

        let env = 'sandbox';
        let currency = 'INR';
        let total = this.props.toPay;

        const client = {
            sandbox:'AaVDfAcSTrACgJbQfhfN6f-hda0fCv_mF9z_Z1L7jHOiDFC0g6zngbD9Q7Y2DZA3bmNpJygkg0h6uyhA',
            production:''
        }
        
       

        
        return (
            <div>
               
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        //only these styles allowed no other
                        size:'large',
                        color: 'blue',
                        shape: 'rect',
                        label: 'checkout'
                    }}
                
                />
            </div>
        );
    }
}

export default Paypal;