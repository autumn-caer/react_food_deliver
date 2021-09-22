import React from "react";
export interface defaultInterface {
    className?: string
    children?: React.ReactNode;
}

export interface modalInterface extends defaultInterface, cartProps{
    
}

export interface buttonProps {
    type : "button" | "submit" | "reset" | undefined 
    onClick?: () => void
    children?: React.ReactNode;
}

export interface cardProps extends defaultInterface{

}

export interface mealItemProps {
    id: string,
    name: string,
    description?: string,
    price: number,
    amount?: number
}

export interface actionProps  {
    type: string,
    id?: string,
    item: mealItemProps
}

export interface stateProps {
    items: Array<mealItemProps>,
    totalAmount: number
}

export interface cartProps {
    onClose: () => void
}

export interface carItemProps {
    name: string,
    price: number,
    amount?: number,
    onRemove: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onAdd: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export interface headerProps {
    onShowCart: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export interface mealItemFormProps {
    id: string,
    onAddToCart: (amount: number) => void

}