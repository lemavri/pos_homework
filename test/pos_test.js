var should = require('should'),
    POS    = require('../lib'),
    db     = require('../db');

describe('exists_in_db', function () {

  describe('when product not in db is given', function () {

    var db = {
      'a': {
        'price': 12345
      }
    };

    it('throws exception', function () {
      var pos = new POS(db),
          products = 'ab'.split("");
      try {
        pos.exists_in_db(products);
      } catch (e) {
        e.toString().should.equal('Error: Some of the products are not in the DB');
      }
    });

  });

});

describe('calculate_total', function () {

  var db = {
    "a": {
      "price": 1200,
      "discount_pack": 4,
      "discount_price": 1000,
      "threshold_qty": 10,
      "threshold_price": 800
    },
    "b": {
      "price": 3000
    },
    "c": {
      "price": 4500
    },
    "d": {
      "price": 225,
      "discount_pack": 10,
      "discount_price": 200
    },
    "e": {
      "price": 3250,
    },
    "f": {
      "price": 4990,
    }
  };

  it('calculates correct amount', function () {
    var pos = new POS(db);

    pos.calculate_total('ABCABCDEF').should.equal(25865);
    pos.calculate_total('CCCCCC').should.equal(27000);
    pos.calculate_total('EFEFEF').should.equal(24720);
    pos.calculate_total('ABCDEF').should.equal(17165);
    pos.calculate_total('EAAAA').should.equal(7250);

    // with threshold
    pos.calculate_total('AAAAAAAA').should.equal(8000); // 10 A
  });

});