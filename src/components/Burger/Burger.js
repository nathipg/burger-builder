import React from 'react';

import BurguerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const Burguer = props => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])].map((_, i) => {
                return <BurguerIngredient key={key + i} type={key} />
            });
        })
        .reduce((list, e) => {
            return list.concat(e);
        }, []);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burguer}>
            <BurguerIngredient type="bread-top" />
            {transformedIngredients}
            <BurguerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burguer;