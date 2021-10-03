import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { mealItemProps, cartProps } from "../../interface/props";
import Checkout from "./Checkout";

const Cart = (props: cartProps) => {
  const [isCheckout, setIsCheckOut] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemsRemoveHandler = (item: mealItemProps) => {
    cartContext.removeItem(item);
  };

  const cartItemAddHanlder = (item: mealItemProps) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = async (userData: any) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-delivery-a9baf-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartContext.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart()
  };

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item: mealItemProps) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount!}
          price={item.price}
          onRemove={cartItemsRemoveHandler.bind(null, item)}
          onAdd={cartItemAddHanlder.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalAction}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const disSubmitModalContent = (
    <React.Fragment>
      <p>Successlly sent the data</p>
      <div className={classes.actions} onClick={props.onClose}>
        Close
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && disSubmitModalContent}
    </Modal>
  );
};

export default Cart;
