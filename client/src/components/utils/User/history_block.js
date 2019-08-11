import React from 'react';
import moment from 'moment';
//moment - use to parse diff formates of dates

// {moment(product.dateOfPurchase).format("MM-DD-YYYY")}

const UserHistoryBlock = (props) => {


    const renderBlocks = () => (
        props.products ?
        //products from <UserHistoryBlock from /User/index.js
            props.products.map((product,i)=>(
                <tr key={i}>
                    <td>{product.porder}</td>
                    <td>{product.brand} {product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.quantity}</td>
                </tr>
            ))
        :null
    )

    return (
        <div className="history_blocks">
            <table>
                <thead>
                    <tr>
                        <th>Order number</th>
                        <th>Product</th>
                        <th>Price paid</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBlocks()}
                </tbody>
            </table>
        </div>
    );
};

export default UserHistoryBlock;