var POS = require('./lib'),
    db = require('./db');

function receiveInput() {

  var products = '';

  if (!process.argv[2]) {
    var path_arr = process.argv[1].split('/'),
        script  = path_arr[path_arr.length-1];

    console.log("Usage example: node " + script  + " AAABBBCCC");

  } else {

    products = process.argv[2];

    var pos = new POS(db);

    try {
      pos.exists_in_db(products);
      console.log(pos.calculate_total(products));
    } catch (e) {
      console.log('Whoops! ' + e);
    }

  }
}

receiveInput();