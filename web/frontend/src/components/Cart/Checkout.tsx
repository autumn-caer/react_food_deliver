import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";
import { defaultInterface } from "../../interface/props";

const isEmpty = (value: string) => value.trim() == "";
const isFiveChar = (value: string) => value.trim().length === 5;

const Checkout = (props: any) => {
  const [formInputValidity, setFormInputValidity] = useState<any>({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef<HTMLInputElement>(null!);
  const streetInputRef = useRef<HTMLInputElement>(null!);
  const portalCodeInputRef = useRef<HTMLInputElement>(null!);
  const cityInputRef = useRef<HTMLInputElement>(null!);

  const confirmHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPortalCode = portalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChar(enteredPortalCode);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPortalCode,
    })
    // submit form data
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} 
      ${formInputValidity.name ? "" : classes.invalid}`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control} 
      ${formInputValidity.street ? "" : classes.invalid}`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${classes.control} 
      ${formInputValidity.postalCode ? "" : classes.invalid}`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={portalCodeInputRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal code!</p>
        )}
      </div>
      <div
        className={`${classes.control} 
      ${formInputValidity.city ? "" : classes.invalid}`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;