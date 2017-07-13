/*eslint-disable no-console*/
import shoppingCart from './shoppingCart'
import {offers} from './model'

//Scenario 1
//----------
const cart1 = shoppingCart.new(offers);
cart1.add('ult_small', 3)
cart1.add('ult_large', 1)
cart1.items
cart1.total
console.log('Cart 1');
console.log('------');
console.log(cart1.items);
console.log(`total value = ${cart1.total}`);

//Scenario 2
//----------
const cart2 = shoppingCart.new(offers);
cart2.add('ult_small', 2)
cart2.add('ult_large', 4)
console.log('Cart 2');
console.log('------');
console.log(cart2.items);
console.log(`total value = ${cart2.total}`);

//Scenario 3
//----------
const cart3 = shoppingCart.new(offers);
cart3.add('ult_small', 1)
cart3.add('ult_medium', 2)
console.log('Cart 3');
console.log('------');
console.log(cart3.items);
console.log(`total value = ${cart3.total}`);

//Scenario 4
//----------
const cart4 = shoppingCart.new(offers);
cart4.add('ult_small', 1)
cart4.add('1gb', 1)
cart4.addPromoCode('I<3AMAYSIM')
console.log('Cart 4');
console.log('------');
console.log(cart4.items);
console.log(`total value = ${cart4.total}`);
