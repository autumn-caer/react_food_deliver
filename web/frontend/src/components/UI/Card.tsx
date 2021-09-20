import React from 'react';
import classes from "./Card.module.css"
import {cardProps} from "../../interface/props"

const Card = (props: cardProps) => {
    return <div className={classes.card}>
        {props.children}
    </div>
}

export default Card