import PropTypes   from 'prop-types'
import React       from 'react'
import { connect } from 'react-redux'
import { Label }   from 'semantic-ui-react'

const colors = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black'
]

const CategoryLabel = ({category}) => (
    !category
    ? <div />
    : (<Label simple color={colors[category.id % 12]}>{category.name}</Label>)
)

CategoryLabel.propTypes = {
    category: PropTypes.object
}

const mapStateToProps = ({ categories }, ownProps) => ({
    category: categories.filter(category => category.id === ownProps.id)[0]
})

export default connect(mapStateToProps, null)(CategoryLabel)
