import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image as ImageComponent, Item } from 'semantic-ui-react';

class SingleProduct extends Component {

    render() {
        return (
            <div>
                <Item>
                    {/*<Item.Image size='tiny' src='/assets/images/wireframe/image.png' />*/}

                    <Item.Content>
                        <Item.Header as='a'>Header</Item.Header>
                        <Item.Meta>Description</Item.Meta>
                        <Item.Description>
                            {/*<Image src='/assets/images/wireframe/short-paragraph.png' />*/}
                        </Item.Description>
                        <Item.Extra>Additional Details</Item.Extra>
                    </Item.Content>
                </Item>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentProduct: state.products.filter(product => {
            return product.id === Number(ownProps.match.params.id)
        })
    }
    
}
export default connect(mapStateToProps, null)(SingleProduct);
