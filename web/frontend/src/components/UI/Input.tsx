import React from "react";
import classes from "./Input.module.css";
import { inputInterface } from "../../interface/input"

const Input = React.forwardRef((props: inputInterface, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <div className={classes.input}>
        <label htmlFor={props.input.id} >{props.label}</label>
        <input ref= {ref} {...props.input} />
    </div>
})

export default Input