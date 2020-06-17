// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Types$MyNewProject = require("./Types.bs.js");
var Evaluator$MyNewProject = require("./Evaluator.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function unevaluate(_res, _ex) {
  while(true) {
    var ex = _ex;
    var res = _res;
    if (typeof ex === "number") {
      if (ex === /* Top */0) {
        return /* [] */0;
      }
      if (typeof res === "number") {
        return /* [] */0;
      }
      switch (res.tag | 0) {
        case /* Rapp */5 :
        case /* Rhole */6 :
        case /* Rfst */8 :
        case /* Rsnd */9 :
            break;
        default:
          return /* [] */0;
      }
    } else if (ex.tag) {
      if (typeof res === "number") {
        return /* [] */0;
      }
      switch (res.tag | 0) {
        case /* Rapp */5 :
            return /* [] */0;
        case /* Rhole */6 :
        case /* Rfst */8 :
        case /* Rsnd */9 :
            break;
        default:
          return /* [] */0;
      }
    } else {
      if (typeof res === "number") {
        return /* [] */0;
      }
      switch (res.tag | 0) {
        case /* Rpair */7 :
            return List.concat(/* :: */[
                        unevaluate(res[0], ex[0]),
                        /* :: */[
                          unevaluate(res[1], ex[1]),
                          /* [] */0
                        ]
                      ]);
        case /* Rapp */5 :
        case /* Rhole */6 :
        case /* Rfst */8 :
        case /* Rsnd */9 :
            break;
        default:
          return /* [] */0;
      }
    }
    if (typeof res !== "number") {
      switch (res.tag | 0) {
        case /* Rapp */5 :
            var r2 = res[1];
            if (!Types$MyNewProject.castable(r2)) {
              return /* [] */0;
            }
            var v = Types$MyNewProject.resToVal(r2);
            if (v !== undefined) {
              _ex = /* Efunc */Block.__(1, [
                  v,
                  ex
                ]);
              _res = res[0];
              continue ;
            }
            throw [
                  Caml_builtin_exceptions.match_failure,
                  /* tuple */[
                    "Unevaluator.re",
                    33,
                    20
                  ]
                ];
        case /* Rhole */6 :
            return /* :: */[
                    /* tuple */[
                      res[1],
                      /* tuple */[
                        res[0],
                        ex
                      ]
                    ],
                    /* [] */0
                  ];
        case /* Rfst */8 :
            _ex = /* Epair */Block.__(0, [
                ex,
                /* Top */0
              ]);
            _res = res[0];
            continue ;
        case /* Rsnd */9 :
            _ex = /* Epair */Block.__(0, [
                /* Top */0,
                ex
              ]);
            _res = res[0];
            continue ;
        
      }
    }
    
  };
}

function constrainExp(exp, exs) {
  if (!exs) {
    return /* [] */0;
  }
  var xs = exs[1];
  var ex = exs[0];
  if (typeof ex !== "number" && ex.tag === /* Efunc */1) {
    return List.concat(/* :: */[
                unevaluate(Evaluator$MyNewProject.$$eval(/* [] */0, /* Application */Block.__(6, [
                            exp,
                            Types$MyNewProject.valToExp(ex[0])
                          ])), ex),
                /* :: */[
                  constrainExp(exp, xs),
                  /* [] */0
                ]
              ]);
  }
  return List.concat(/* :: */[
              unevaluate(Evaluator$MyNewProject.$$eval(/* [] */0, exp), ex),
              /* :: */[
                constrainExp(exp, xs),
                /* [] */0
              ]
            ]);
}

exports.unevaluate = unevaluate;
exports.constrainExp = constrainExp;
/* No side effect */
