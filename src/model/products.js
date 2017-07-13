export class Product {
  constructor(code, name, price) {
    this.productCode = code;
    this.productName = name;
    this.productPrice = price;
  }

  get name() {
    return this.productName;
  }

  get price() {
    return this.productPrice;
  }

  get code() {
    return this.productCode;
  }
}

export default {
  'ult_small': new Product('ult_small', 'Unlimited 1GB', 24.9),
  'ult_medium': new Product('ult_medium', 'Unlimited 2GB', 29.9),
  'ult_large': new Product('ult_large', 'Unlimited 5GB', 44.9),
  '1gb': new Product('1gb', '1 GB Data-pack', 9.9),
};
