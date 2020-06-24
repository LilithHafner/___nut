// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Tools$MyNewProject = require("./Tools.bs.js");
var Types$MyNewProject = require("./Types.bs.js");

function getType(delta, gamma, _e) {
  while(true) {
    var e = _e;
    if (typeof e === "number") {
      if (e === /* Nil */0) {
        return /* Any_t */3;
      } else {
        return /* Unit_t */2;
      }
    }
    switch (e.tag | 0) {
      case /* Int */0 :
          return /* Int_t */0;
      case /* Float */1 :
          return /* Any_t */3;
      case /* Bool */2 :
          return /* Bool_t */1;
      case /* Cons */3 :
          return /* Cons_t */Block.__(0, [
                    getType(delta, gamma, e[0]),
                    getType(delta, gamma, e[1])
                  ]);
      case /* Function */4 :
          return /* Function_t */Block.__(1, [
                    Tools$MyNewProject.lookup(e[0], gamma),
                    getType(delta, gamma, e[1])
                  ]);
      case /* Application */5 :
          var match = getType(delta, gamma, e[0]);
          if (typeof match === "number" || !(match.tag === /* Function_t */1 && Caml_obj.caml_equal(getType(delta, gamma, e[1]), match[0]))) {
            return Pervasives.failwith("Application type error");
          } else {
            return match[1];
          }
      case /* Hole */6 :
          return Tools$MyNewProject.lookup(e[0], delta)[1];
      case /* Var */7 :
          return Tools$MyNewProject.lookup(e[0], gamma);
      case /* Pair */8 :
          return /* Pair_t */Block.__(2, [
                    getType(delta, gamma, e[0]),
                    getType(delta, gamma, e[1])
                  ]);
      case /* Fst */9 :
          var e$prime = e[0];
          if (typeof e$prime === "number") {
            return Pervasives.failwith("Type error, expected pair");
          }
          if (e$prime.tag !== /* Pair */8) {
            return Pervasives.failwith("Type error, expected pair");
          }
          _e = e$prime[0];
          continue ;
      case /* Snd */10 :
          var e$prime$1 = e[0];
          if (typeof e$prime$1 === "number") {
            return Pervasives.failwith("Type error, expected pair");
          }
          if (e$prime$1.tag !== /* Pair */8) {
            return Pervasives.failwith("Type error, expected pair");
          }
          _e = e$prime$1[1];
          continue ;
      
    }
  };
}

function getResType(delta, _r) {
  while(true) {
    var r = _r;
    if (typeof r === "number") {
      if (r === /* Rnil */0) {
        return Pervasives.failwith("Not yet implemented");
      } else {
        return /* Unit_t */2;
      }
    }
    switch (r.tag | 0) {
      case /* Rint */0 :
          return /* Int_t */0;
      case /* Rfloat */1 :
          return /* Any_t */3;
      case /* Rbool */2 :
          return /* Bool_t */1;
      case /* Rcons */3 :
          return Pervasives.failwith("Not yet implemented");
      case /* Rfunc */4 :
          return getType(delta, generateContext(delta, r[2]), /* Function */Block.__(4, [
                        r[0],
                        r[1]
                      ]));
      case /* Rapp */5 :
          var match = getResType(delta, r[0]);
          if (typeof match === "number" || !(match.tag === /* Function_t */1 && Caml_obj.caml_equal(match[0], getResType(delta, r[1])))) {
            return Pervasives.failwith("Type error, failed application");
          } else {
            return match[1];
          }
      case /* Rhole */6 :
          var match$1 = Tools$MyNewProject.lookup(r[0], delta);
          if (Caml_obj.caml_equal(match$1[0], generateContext(delta, r[1]))) {
            return match$1[1];
          } else {
            return Pervasives.failwith("Type error: hole context doesn't match environment context");
          }
      case /* Rpair */7 :
          return /* Pair_t */Block.__(2, [
                    getResType(delta, r[0]),
                    getResType(delta, r[1])
                  ]);
      case /* Rfst */8 :
          var r$prime = r[0];
          if (typeof r$prime === "number") {
            return Pervasives.failwith("Type error: Exppected pair");
          }
          if (r$prime.tag !== /* Rpair */7) {
            return Pervasives.failwith("Type error: Exppected pair");
          }
          _r = r$prime[0];
          continue ;
      case /* Rsnd */9 :
          var r$prime$1 = r[0];
          if (typeof r$prime$1 === "number") {
            return Pervasives.failwith("Type error: Exppected pair");
          }
          if (r$prime$1.tag !== /* Rpair */7) {
            return Pervasives.failwith("Type error: Exppected pair");
          }
          _r = r$prime$1[1];
          continue ;
      
    }
  };
}

function generateContext(delta, env) {
  if (!env) {
    return /* [] */0;
  }
  var match = env[0];
  return /* :: */[
          /* tuple */[
            match[0],
            getResType(delta, match[1])
          ],
          generateContext(delta, env[1])
        ];
}

function getExType(delta, ex) {
  if (typeof ex === "number") {
    if (ex === /* Top */0) {
      return /* Any_t */3;
    } else {
      return /* Unit_t */2;
    }
  }
  switch (ex.tag | 0) {
    case /* Eint */0 :
        return /* Int_t */0;
    case /* Ebool */1 :
        return /* Bool_t */1;
    case /* Epair */2 :
        return /* Pair_t */Block.__(2, [
                  getExType(delta, ex[0]),
                  getExType(delta, ex[1])
                ]);
    case /* Efunc */3 :
        return /* Function_t */Block.__(1, [
                  getResType(delta, Types$MyNewProject.valToRes(ex[0])),
                  getExType(delta, ex[1])
                ]);
    
  }
}

function getConstraintType(delta, exs) {
  var contexts = List.map((function (param) {
          return /* tuple */[
                  generateContext(delta, param[0]),
                  getExType(delta, param[1])
                ];
        }), exs);
  if (!contexts) {
    return /* tuple */[
            /* [] */0,
            /* Any_t */3
          ];
  }
  var x = contexts[0];
  var match = List.filter((function (y) {
            return Caml_obj.caml_notequal(x, y);
          }))(contexts);
  if (match) {
    return x;
  } else {
    return Pervasives.failwith("Inconsistent environment / example types");
  }
}

function generateHoleContextU(us) {
  if (!us) {
    return /* [] */0;
  }
  var match = us[0];
  return /* :: */[
          /* tuple */[
            match[0],
            getConstraintType(/* [] */0, match[1])
          ],
          generateHoleContextU(us[1])
        ];
}

function generateHoleContextF(fs) {
  return /* [] */0;
}

exports.getType = getType;
exports.getResType = getResType;
exports.generateContext = generateContext;
exports.getExType = getExType;
exports.getConstraintType = getConstraintType;
exports.generateHoleContextU = generateHoleContextU;
exports.generateHoleContextF = generateHoleContextF;
/* No side effect */
