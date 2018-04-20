import React     from 'react';
import { Label } from 'semantic-ui-react';

const colors = [
    "red",
    "orange",
    "yellow",
    "olive",
    "green",
    "teal",
    "blue",
    "violet",
    "purple",
    "pink",
    "brown",
    "grey",
    "black"
]

const CategoryLabel = (props) => {
    return (
        <Label simple color={colors[props.id]}>{props.id}</Label>
    );
}

export default CategoryLabel;