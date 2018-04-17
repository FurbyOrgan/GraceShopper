import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SingleProduct from './single-product'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('product', () => {
  let product

  beforeEach(() => {
    product = shallow(<SingleProduct name={'NAME'} price={9.99} inventory={9999} desc={'DESCRIPTION'} categories={'MISC'}/>)
  })

  it('renders name in an h3', () => {
    expect(product.find('h3').text()).to.be.equal('NAME')
  })

  it('renders price in an h4', () => {
    expect(product.find('h4').text()).to.be.equal('9.99')
  })

  it('renders inventory in an h6', () => {
    expect(product.find('h6').text()).to.be.equal('9999')
  })

  it('renders description in a p', () => {
    expect(product.find('p').text()).to.be.equal('DESCRIPTION')
  })

  it('renders category in an li', () => {
    expect(product.find('li').text()).to.be.equal('MISC')
  })

})
