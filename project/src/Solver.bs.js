// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Tools$MyNewProject = require("./Tools.bs.js");
var Filler$MyNewProject = require("./Filler.bs.js");
var Typing$MyNewProject = require("./Typing.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function solve_h(_hContext, _k) {
  while(true) {
    var k = _k;
    var hContext = _hContext;
    var f = k[1];
    var u = k[0];
    if (!u) {
      return /* tuple */[
              f,
              hContext
            ];
    }
    var match = u[0];
    var h = match[0];
    var match$1 = Tools$MyNewProject.lookup(h, hContext);
    var match$2 = Filler$MyNewProject.fill(hContext, f, match$1[0], h, match$1[1], match[1]);
    var k$prime = match$2[0];
    var k$prime$prime_000 = Pervasives.$at(k$prime[0], u[1]);
    var k$prime$prime_001 = k$prime[1];
    var k$prime$prime = /* tuple */[
      k$prime$prime_000,
      k$prime$prime_001
    ];
    _k = k$prime$prime;
    _hContext = match$2[1];
    continue ;
  };
}

function solve(k) {
  if (k !== undefined) {
    var hContext = Typing$MyNewProject.generateHoleContextU(k[0]);
    return solve_h(hContext, k);
  }
  throw [
        Caml_builtin_exceptions.match_failure,
        /* tuple */[
          "Solver.re",
          27,
          8
        ]
      ];
}

exports.solve_h = solve_h;
exports.solve = solve;
/* No side effect */