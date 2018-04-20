import React, { Component } from 'react';






class AssignCategories extends Component {




render (){
    return(
        <h2>Assign Categories</h2>
    )
}

}




const mapState = ({user, categories }) =>( {user, categories });

const mapDispatch = null

export default connect(mapState, mapDispatch)(AssignCategories )