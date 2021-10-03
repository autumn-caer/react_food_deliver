import { useReducer } from "react";
import React from "react";
import CartContext from "./cart-context";
import { mealItemProps, actionProps, stateProps } from "../interface/props";


const defaultCarState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: stateProps, action: actionProps) => {
  if (action.type === "ADD") {

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount!;

    const existCartItemIndex = state.items.findIndex(
      (item: mealItemProps) => item.id === action.item.id
    );

    const existingCartItem = state.items[existCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount! + action.item.amount!,
      };
      updatedItems = [...state.items];

      updatedItems[existCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existCartItemIndex = state.items.findIndex(
      (item: mealItemProps) => item.id === action.item.id
    );

    const existingItem = state.items[existCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems
    if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item: mealItemProps) => item.id !== action.item.id)
    } else {
        const updatedItem = {...existingItem, amount: existingItem.amount! - 1}
        updatedItems = [...state.items]
        updatedItems[existCartItemIndex] = updatedItem

    }

    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === 'CLEAR') {
    return defaultCarState;
  }

  return defaultCarState;
};

const CartProvider = (props: any) => {
  const [cartState, dispatchCarAction] = useReducer(
    cartReducer,
    defaultCarState
  );

  const addItemToCartHandler = (item: mealItemProps) => {
    dispatchCarAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (item: mealItemProps) => {
    dispatchCarAction({ type: "REMOVE", item: item });
  };

  const clearCarthandler = () => {
    dispatchCarAction({ type: "CLEAR", item: {id: '', name: '', price: 0}});
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCarthandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
