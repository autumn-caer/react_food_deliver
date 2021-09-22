export interface defaultInterface {
    className?: string
    children?: React.ReactNode;
}

export interface modalInterface extends defaultInterface{
    onClose: () => {}
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