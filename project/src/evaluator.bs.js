// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Tools$MyNewProject = require("./Tools.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function $$eval(__env, _e) {
  while(true) {
    var e = _e;
    var _env = __env;
    if (typeof e === "number") {
      if (e === /* Nil */0) {
        return /* Rnil */0;
      } else {
        return /* Runit */1;
      }
    }
    switch (e.tag | 0) {
      case /* Int */0 :
          return /* Rint */Block.__(0, [e[0]]);
      case /* Float */1 :
          return /* Rfloat */Block.__(1, [e[0]]);
      case /* Bool */2 :
          return /* Rbool */Block.__(2, [e[0]]);
      case /* Cons */3 :
          return /* Rcons */Block.__(3, [
                    $$eval(_env, e[0]),
                    $$eval(_env, e[1])
                  ]);
      case /* Variable */4 :
          throw [
                Caml_builtin_exceptions.match_failure,
                /* tuple */[
                  "evaluator.re",
                  16,
                  48
                ]
              ];
      case /* Function */5 :
          return /* Rfunc */Block.__(4, [
                    e[0],
                    e[1],
                    _env
                  ]);
      case /* Application */6 :
          var e2 = e[1];
          var e1 = e[0];
          if (typeof e1 !== "number" && e1.tag === /* Function */5) {
            _e = e1[1];
            __env = /* :: */[
              /* tuple */[
                e1[0],
                $$eval(_env, e2)
              ],
              _env
            ];
            continue ;
          }
          return /* Rapp */Block.__(5, [
                    $$eval(_env, e1),
                    $$eval(_env, e2)
                  ]);
      case /* Hole */7 :
          return /* Rhole */Block.__(6, [
                    e[0],
                    _env
                  ]);
      case /* Var */8 :
          return Tools$MyNewProject.lookup(e[0], _env);
      case /* Pair */9 :
          return /* Rpair */Block.__(7, [
                    $$eval(_env, e[0]),
                    $$eval(_env, e[1])
                  ]);
      case /* Fst */10 :
          return /* Rfst */Block.__(8, [$$eval(_env, e[0])]);
      case /* Snd */11 :
          return /* Rsnd */Block.__(9, [$$eval(_env, e[0])]);
      
    }
  };
}

exports.$$eval = $$eval;
/* No side effect */
