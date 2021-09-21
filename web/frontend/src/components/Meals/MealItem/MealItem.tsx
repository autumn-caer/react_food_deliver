import React, { useContext } from "react";
import MeatItemForm from "./MeatItemForm";
import classes from "./MealItem.module.css";
import { mealItemProps } from "../../../interface/props";
import CartContext from "../../../store/cart-context"

const MealItem = (props: mealItemProps) => {
  const cartCtx = useContext(CartContext)
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount: any) => {
    console.log('addToCartHandler')
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MeatItemForm id= {props.id} onAddToCart= {addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealItem;
