// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");

function all(_x) {
  while(true) {
    var x = _x;
    if (!x) {
      return true;
    }
    if (!x[0]) {
      return false;
    }
    _x = x[1];
    continue ;
  };
}

function all_predicate(f, l) {
  return all(List.map(f, l));
}

exports.all = all;
exports.all_predicate = all_predicate;
/* No side effect */
