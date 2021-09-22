import { useContext, useEffect, useState } from "react"
import CartContext from "../../store/cart-context"
import React from "react";
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"
import { headerProps } from "../../interface/props";

const HeaderCartButton = (props: headerProps) => {
  const [btnHighlightend, setBtnHighlightend] = useState<boolean>(false)
  const cartCtx = useContext(CartContext)
  const { items } = cartCtx

  const numberOfCartItems = items.reduce((curNumber: number, item: any) => {
    return curNumber + item.amount
  }, 0)


  const btnClasses = `${classes.button} ${btnHighlightend ? classes.bump : ''}`

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return
    }
    setBtnHighlightend(true)
    const timer = setTimeout(() => {
      setBtnHighlightend(false)
    }, 300)
    
    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return <button className={btnClasses} onClick ={props.onShowCart}>
      <span>
        <CartIcon/>
      </span>
      <span>Your Cart</span>
<span className={classes.badge}>{ numberOfCartItems }</span>
  </button>
};

export default HeaderCartButton;
