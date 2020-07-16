// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Tools$MyNewProject = require("./Tools.bs.js");
var Filler$MyNewProject = require("./Filler.bs.js");
var Typing$MyNewProject = require("./Typing.bs.js");
var Printer$MyNewProject = require("./Printer.bs.js");
var Refiner$MyNewProject = require("./Refiner.bs.js");
var Evaluator$MyNewProject = require("./evaluator.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function solve_h(hContext, k) {
  var f = k[1];
  var u = k[0];
  if (!u) {
    return /* tuple */[
            f,
            hContext
          ];
  }
  var us = u[1];
  var match = u[0];
  var h = match[0];
  var match$1 = Tools$MyNewProject.lookup(h, hContext);
  var ks = Filler$MyNewProject.fill(hContext, f, match$1[0], h, match$1[1], match[1]);
  var candidates = List.map((function (param) {
          var k$prime = param[0];
          var k$prime$prime_000 = Pervasives.$at(k$prime[0], us);
          var k$prime$prime_001 = k$prime[1];
          var k$prime$prime = /* tuple */[
            k$prime$prime_000,
            k$prime$prime_001
          ];
          return solve_h(param[1], k$prime$prime);
        }), ks);
  var match$2 = List.filter(Filler$MyNewProject.optionPred)(candidates);
  if (match$2) {
    return match$2[0];
  }
  
}

function solve(k, e) {
  Refiner$MyNewProject.outFunc.contents = true;
  if (k !== undefined) {
    var hContext = Typing$MyNewProject.generateHoleContextU(k[0]);
    var match = solve_h(hContext, k);
    if (match === undefined) {
      return Pervasives.failwith("Could not synthesize expression that met constraints");
    }
    var f = match[0];
    console.log("Expression:");
    console.log(Printer$MyNewProject.string_of_exp(Evaluator$MyNewProject.fillExp(e, f)));
    console.log("Hole fillings:");
    return /* tuple */[
            f,
            match[1]
          ];
  }
  throw [
        Caml_builtin_exceptions.match_failure,
        /* tuple */[
          "Solver.re",
          42,
          8
        ]
      ];
}

exports.solve_h = solve_h;
exports.solve = solve;
/* No side effect */
