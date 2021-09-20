import React, {Fragment} from "react";
import MeaslSummary from "./MealsSummary"
import AvailableMeals from "./AvailableMeals"

const meals = () => {
    return <Fragment>
        <MeaslSummary/>
        <AvailableMeals/>
    </Fragment>
}

export default meals