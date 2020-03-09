import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
            </li>;
        });

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button
                btnType="Danger"
                clicked={props.purchaseCancelled}
            >
                CANCEL
            </Button>
            <Button
                btnType="Success"
                clicked={props.purchasaContinued}
            >
                CONTINUE
            </Button>
        </Fragment>
    );
};

export default OrderSummary;