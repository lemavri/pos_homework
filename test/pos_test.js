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

  it('calculates correct amount', function () {
    var pos = new POS(db);

    pos.calculate_total('ABCABCDEF').should.equal(25865);
    pos.calculate_total('CCCCCC').should.equal(27000);
    pos.calculate_total('EFEFEF').should.equal(24720);
    pos.calculate_total('ABCDEF').should.equal(17165);
    pos.calculate_total('EAAAA').should.equal(7250);
  });

});