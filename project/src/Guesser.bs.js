// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Typing$MyNewProject = require("./Typing.bs.js");

var memo = Caml_array.caml_make_vect(10, /* [] */0);

function partition_h(n, m) {
  if (n < m) {
    return /* [] */0;
  } else {
    return /* :: */[
            /* tuple */[
              n,
              m
            ],
            partition_h(n - 1 | 0, m + 1 | 0)
          ];
  }
}

function partition(n) {
  return partition_h(n - 1 | 0, 1);
}

function guessApp(delta, gamma, typ, i, j) {
  var funcs = List.filter((function (e) {
            var match = Typing$MyNewProject.getType(delta, gamma, e);
            if (typeof match === "number" || !(match.tag === /* Function_t */1 && Caml_obj.caml_equal(match[1], typ))) {
              return false;
            } else {
              return true;
            }
          }))(Caml_array.caml_array_get(memo, i));
  var args = List.filter((function (e) {
            return List.exists((function (x) {
                          var t = Typing$MyNewProject.getType(delta, gamma, e);
                          var match = Typing$MyNewProject.getType(delta, gamma, x);
                          if (typeof match === "number" || !(match.tag === /* Function_t */1 && Caml_obj.caml_equal(t, match[0]))) {
                            return false;
                          } else {
                            return true;
                          }
                        }), funcs);
          }))(Caml_array.caml_array_get(memo, j));
  return List.concat(List.map((function (e) {
                    var match = Typing$MyNewProject.getType(delta, gamma, e);
                    if (typeof match === "number") {
                      return Pervasives.failwith("Something is wrong with guesser");
                    }
                    if (match.tag !== /* Function_t */1) {
                      return Pervasives.failwith("Something is wrong with guesser");
                    }
                    var t1 = match[0];
                    var corrArgs = List.filter((function (e2) {
                              return Caml_obj.caml_equal(t1, Typing$MyNewProject.getType(delta, gamma, e2));
                            }))(args);
                    return List.map((function (e2) {
                                  return /* Application */Block.__(5, [
                                            e,
                                            e2
                                          ]);
                                }), corrArgs);
                  }), funcs));
}

function guess(delta, gamma, typ, i) {
  if (i === 1) {
    var terms = List.filter((function (param) {
              return Caml_obj.caml_equal(param[1], typ);
            }))(gamma);
    Caml_array.caml_array_set(memo, 0, List.map((function (param) {
                return /* Var */Block.__(7, [param[0]]);
              }), terms));
    return Caml_array.caml_array_get(memo, 0);
  }
  var pairs = partition(i);
  Caml_array.caml_array_set(memo, i, List.concat(List.map((function (param) {
                  return guessApp(delta, gamma, typ, param[0], param[1]);
                }), pairs)));
  return Caml_array.caml_array_get(memo, i);
}

exports.memo = memo;
exports.partition_h = partition_h;
exports.partition = partition;
exports.guessApp = guessApp;
exports.guess = guess;
/* No side effect */