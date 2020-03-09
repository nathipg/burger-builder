import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData, idToken) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + idToken, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
}

const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    };
}

const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    };
}

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
}

export const fetchOrders = (idToken, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = `?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`;
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                
                dispatch(fetchOrdersSuccess(fetchedOrders));
            }).catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    };
}