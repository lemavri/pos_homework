function POS(db) {
  if (!(this instanceof POS)) {
    return new POS();
  }

  this.db = db;

  return this;
}

POS.prototype.calculate_total = function (products) {

  products = prepare_products_input(products);

  var counts = {},
      total = 0,
      db = this.db;

  products.forEach( function(el) { counts[el] = (counts[el] || 0) + 1; });

  Object.keys(counts).forEach( function(key) {

    var count = counts[key],
        product = db[key],
        subtotal = 0;

    if (product.discount_pack && count >= product.discount_pack) {

      var bundles = (count / product.discount_pack).toString().split(".");

      subtotal = bundles[0] * product.discount_pack * product.discount_price;

      if (bundles[1]) {
        subtotal += (bundles[1] / 10 * product.discount_pack) * product.price;
      }

    } else {
      subtotal = product.price * count;
    }

    total += subtotal;
  });

  return total;
};

POS.prototype.exists_in_db = function (products) {

  products = prepare_products_input(products);

  var db_products = Object.keys(this.db),
      input_products = products.filter( function (item, i, ar) { return ar.indexOf(item) === i; }),
      exist = true;

  var len = input_products.length, i = 0;

  for (i; i < len; i++) {

    if (db_products.indexOf(input_products[i]) === -1) {
      exist = false;
      break;
    }

  }

  if (!exist) {
    throw new Error('Some of the products are not in the DB');
  }
};

function prepare_products_input(products) {
  return products.toString().toLowerCase().trim().split("");
}

module.exports = POS;