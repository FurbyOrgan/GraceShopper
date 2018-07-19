import React       from 'react'
import { connect } from 'react-redux'

import CategoryList from './category-list'

const AssignCategories = () => (
    <div>
        <h2>Assign Categories</h2>
        <CategoryList />
    </div>
)

const mapState = ({ user, categories }) => ({ user, categories })

export default connect(mapState, null)(AssignCategories)
