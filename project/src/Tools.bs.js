// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function lookup(key, _plst) {
  while(true) {
    var plst = _plst;
    if (plst) {
      var match = plst[0];
      if (Caml_obj.caml_equal(match[0], key)) {
        return match[1];
      }
      _plst = plst[1];
      continue ;
    }
    console.log(key);
    console.log(plst);
    return Pervasives.failwith("Key not in list");
  };
}

exports.lookup = lookup;
/* No side effect */