import { useReducer } from "react";
import React from "react";
import CartContext from "./cart-context";

const defaultCarState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: any, action: any) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existCartItemIndex = state.items.findIndex(
      (item: any) => item.id === action.item.id
    );

    const existingCartItem = state.items[existCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];

      updatedItems[existCartItemIndex] = updatedItem;
    } else {
      // updatedItem = {...action.item}
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existCartItemIndex = state.items.findIndex(
      (item: any) => item.id === action.id
    );

    const existingItem = state.items[existCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems
    if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item: any) => item.id !== action.id)
    } else {
        const updatedItem = {...existingItem, amount: existingItem.amount - 1}
        updatedItems = [...state.items]
        updatedItems[existCartItemIndex] = updatedItem

    }

    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
    }
  }

  return defaultCarState;
};

const CartProvider = (props: any) => {
  const [cartState, dispatchCarAction] = useReducer(
    cartReducer,
    defaultCarState
  );

  const addItemToCartHandler = (item: any) => {
    dispatchCarAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCarAction({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
