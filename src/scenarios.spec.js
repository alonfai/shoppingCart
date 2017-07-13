import { expect } from 'chai';
import shoppingCart from './shoppingCart'
import {offers} from './model'

describe('Scenarios', () => {

  it('empty cart', () => {
    let cart = shoppingCart.new(offers)
    let items = cart.items
    let total = cart.total
    expect(items.length).to.equal(0 )
    expect(total).to.equal(0)
  })

  describe('Scenario 1 (3X 1GB + 1X 5GB)', function() {
    let items;
    let total;
    let cart;

    before(() => {
      cart = shoppingCart.new(offers)
      cart.add('ult_small', 3)
      cart.add('ult_large', 1)
      items = cart.items
      total = cart.total
    })

    after(() => {
      cart = undefined
      items = undefined
      total = undefined
    })

    it('number of products equal 2', () => {
      expect(items.length).to.equal(2)
    })

    it('expect proper items inside', () => {
      const smallPackage = items.find(item => item.type.code === 'ult_small')
      expect(smallPackage).to.exist;
      expect(smallPackage.quantity).to.equal(3)

      const bigPackage = items.find(item => item.type.code === 'ult_large')
      expect(bigPackage).to.exist;
      expect(bigPackage.quantity).to.equal(1)
    })

    it('expect total price to match', () => {
      expect(total).to.equal(94.7)
    })
  });

  describe('Scenario 2 (2X 1GB + 4X 5GB)', function() {
    let items;
    let total;
    let cart;

    before(() => {
      cart = shoppingCart.new(offers)
      cart.add('ult_small', 2)
      cart.add('ult_large', 4)
      items = cart.items
      total = cart.total
    })

    after(() => {
      cart = undefined
      items = undefined
      total = undefined
    })

    it('number of products 2', () => {
      expect(items.length).to.equal(2)
    })

    it('expect proper items inside', () => {
      const mediumPackage = items.find(item => item.type.code === 'ult_small')
      expect(mediumPackage).to.exist;
      expect(mediumPackage.quantity).to.equal(2)

      const bigPackage = items.find(item => item.type.code === 'ult_large')
      expect(bigPackage).to.exist;
      expect(bigPackage.quantity).to.equal(4)
    })

    it('expect total price to match', () => {
      expect(total).to.equal(209.40)
    })
  });

  describe('Scenario 3 (1X 1GB + 2X 2GB)', function() {
    let items;
    let total;
    let cart;

    before(() => {
      cart = shoppingCart.new(offers)
      cart.add('ult_small', 1)
      cart.add('ult_medium', 2)
      items = cart.items
      total = cart.total
    })

    after(() => {
      cart = undefined
      items = undefined
      total = undefined
    })

    it('number of products 3', () => {
      expect(items.length).to.equal(3)
    })

    it('expect proper items inside', () => {
      const mediumPackage = items.find(item => item.type.code === 'ult_small')
      expect(mediumPackage).to.exist;
      expect(mediumPackage.quantity).to.equal(1)

      const bigPackage = items.find(item => item.type.code === 'ult_medium')
      expect(bigPackage).to.exist;
      expect(bigPackage.quantity).to.equal(2)

      const dataPacks = items.find(item => item.type.code === '1gb')
      expect(dataPacks).to.exist;
      expect(dataPacks.quantity).to.equal(2)
    })

    it('expect total price to match', () => {
      expect(total).to.equal(84.70)
    })
  });

  describe('Scenario 4 (1X 1GB + 1X data-pack)', function() {
    let items;
    let total;
    let cart;

    before(() => {
      cart = shoppingCart.new(offers)
      cart.add('ult_small', 1)
      cart.add('1gb', 1)
      cart.addPromoCode('I<3AMAYSIM')
      items = cart.items
      total = cart.total
    })

    after(() => {
      cart = undefined
      items = undefined
      total = undefined
    })

    it('number of products 2', () => {
      expect(items.length).to.equal(2)
    })

    it('expect proper items inside', () => {
      const mediumPackage = items.find(item => item.type.code === 'ult_small')
      expect(mediumPackage).to.exist;
      expect(mediumPackage.quantity).to.equal(1)

      const bigPackage = items.find(item => item.type.code === '1gb')
      expect(bigPackage).to.exist;
      expect(bigPackage.quantity).to.equal(1)
    })

    it('expect total price to match', () => {
      expect(total).to.equal(31.32)
    })
  });

});
