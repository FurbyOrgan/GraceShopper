import { connect }        from 'react-redux';
import { Label }          from 'semantic-ui-react';
import React, {Component} from 'react';

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

class CategoryLabel extends Component {
    render() {
        const category = this.props.category
        if (!category) return (<div />)
        
        return (
            <Label simple color={colors[category.id]}>{category.name}</Label>
        );
    }  
}

const mapStateToProps = (state, ownProps) => {
    return {
        category: state.categories.filter(category => {
            return category.id === ownProps.id
        })[0]
    }
}

export default connect(mapStateToProps, null)(CategoryLabel);