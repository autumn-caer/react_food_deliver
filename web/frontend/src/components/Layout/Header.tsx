import React from 'react';
import HeaderCartButton from "./HeaderCartButton"
import mealsImages from "../../assets/meals.jpg"
import classes from "./Header.module.css"
import { headerProps } from "../../interface/props";



const Header = (props: headerProps) => {
    return <React.Fragment>
        <header className= {classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onShowCart = {props.onShowCart}/>
        </header>
        <div className = {classes['main-image']}>
            <img src = {mealsImages}/>
        </div>
    </React.Fragment>
}

export default Header