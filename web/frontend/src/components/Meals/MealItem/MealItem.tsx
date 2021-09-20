import React from "react";
import MeatItemForm from "./MeatItemForm";
import classes from "./MealItem.module.css";
import { mealItemProps } from "../../../interface/props";

const MealItem = (props: mealItemProps) => {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MeatItemForm id= {props.id}/>
      </div>
    </li>
  );
};

export default MealItem;
