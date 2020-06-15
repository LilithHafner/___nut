// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function lookup(_env, identifier) {
  while(true) {
    var env = _env;
    if (!env) {
      return Pervasives.failwith("Unbound variable");
    }
    var xs = env[1];
    var match = env[0];
    if (xs) {
      if (xs[1]) {
        _env = xs;
        continue ;
      }
      if (Caml_obj.caml_equal(match[0], identifier)) {
        return match[1];
      }
      _env = xs;
      continue ;
    }
    _env = xs;
    continue ;
  };
}

exports.lookup = lookup;
/* No side effect */