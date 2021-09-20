export interface defaultInterface {
    className?: string
    children?: React.ReactNode;
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
    description: string,
    price: number
}