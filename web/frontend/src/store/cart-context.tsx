import React from "react";
import { mealItemProps } from "../interface/props";


const CartContext = React.createContext({
  items: new Array<mealItemProps>(),
  totalAmount: 0,
  addItem: (item: mealItemProps) => {},
  removeItem: (item: mealItemProps) => {},
  clearCart: () => {}
});

export default CartContext
