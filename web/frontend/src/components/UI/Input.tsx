import React from "react";
import classes from "./Input.module.css";
import { inputInterface } from "../../interface/input"


const Input = (props: inputInterface) => {
    return <div className={classes.input}>
        <label htmlFor={props.input.id} >{props.label}</label>
        <input {...props.input} />
    </div>
}

export default Input