// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Tools$MyNewProject = require("./Tools.bs.js");
var Types$MyNewProject = require("./Types.bs.js");
var Guesser$MyNewProject = require("./Guesser.bs.js");
var Evaluator$MyNewProject = require("./evaluator.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");
var IdGenerator$MyNewProject = require("./IdGenerator.bs.js");
var Unevaluator$MyNewProject = require("./unevaluator.bs.js");

function simplifyConstructor(res) {
  if (typeof res === "number") {
    return res;
  }
  if (res.tag !== /* Rictor */11) {
    return res;
  }
  var match = res[2];
  if (typeof match === "number" || !(match.tag === /* Rctor */10 && res[0] === match[0])) {
    return res;
  } else {
    return match[2];
  }
}

function distribute(delta, exs, adt, scrut, ctors) {
  return List.map((function (param) {
                var id = param[0];
                return List.filter((function (param) {
                                var r = Evaluator$MyNewProject.$$eval(param[0], scrut);
                                return Unevaluator$MyNewProject.optionPred(Unevaluator$MyNewProject.unevaluate(delta, r, /* Ector */Block.__(4, [
                                                  id,
                                                  adt,
                                                  /* Top */0
                                                ])));
                              }))(exs);
              }), ctors);
}

function branch_indiv(delta, gamma, typ, exs, datatype) {
  var es = Pervasives.$at(Guesser$MyNewProject.guess(delta, gamma, /* D */Block.__(3, [datatype]), 1), Pervasives.$at(Guesser$MyNewProject.guess(delta, gamma, /* D */Block.__(3, [datatype]), 2), Guesser$MyNewProject.guess(delta, gamma, /* D */Block.__(3, [datatype]), 3)));
  return List.map((function (e) {
                var constructors = Tools$MyNewProject.lookup(datatype, Types$MyNewProject.sigma);
                var distributedExs = distribute(delta, exs, datatype, e, constructors);
                var unevalCons = List.fold_left(Unevaluator$MyNewProject.mergeCons, /* tuple */[
                      /* [] */0,
                      /* [] */0
                    ], List.map((function (exs) {
                            return Unevaluator$MyNewProject.constrainExp(delta, e, exs);
                          }), distributedExs));
                var branches = List.map((function (param) {
                        var id = param[0];
                        var h = IdGenerator$MyNewProject.getId(undefined);
                        var tmp = param[1];
                        if (typeof tmp !== "number" && tmp.tag === /* Pair_t */2) {
                          var x1 = IdGenerator$MyNewProject.getId(undefined);
                          var x2 = IdGenerator$MyNewProject.getId(undefined);
                          return /* tuple */[
                                  id,
                                  /* tuple */[
                                    /* P */Block.__(1, [
                                        /* V */Block.__(0, [x1]),
                                        /* V */Block.__(0, [x2])
                                      ]),
                                    /* Hole */Block.__(6, [h])
                                  ]
                                ];
                        }
                        var x = IdGenerator$MyNewProject.getId(undefined);
                        return /* tuple */[
                                id,
                                /* tuple */[
                                  /* V */Block.__(0, [x]),
                                  /* Hole */Block.__(6, [h])
                                ]
                              ];
                      }), constructors);
                var exp = /* Case */Block.__(12, [
                    e,
                    branches
                  ]);
                var newExCons = List.map2((function (dExs, param) {
                        var p = param[1][0];
                        var id = param[0];
                        return List.map((function (param) {
                                      var env = param[0];
                                      var r = simplifyConstructor(/* Rictor */Block.__(11, [
                                              id,
                                              datatype,
                                              Evaluator$MyNewProject.$$eval(env, e)
                                            ]));
                                      var patBinds = List.map((function (x) {
                                              return Unevaluator$MyNewProject.getPatRes(x, p, r);
                                            }), Unevaluator$MyNewProject.getPatIds(p));
                                      return /* tuple */[
                                              Pervasives.$at(patBinds, env),
                                              param[1]
                                            ];
                                    }), dExs);
                      }), distributedExs, branches);
                var goals = List.mapi((function (i, param) {
                        var match = param[1];
                        var h = match[1];
                        if (typeof h === "number") {
                          throw [
                                Caml_builtin_exceptions.match_failure,
                                /* tuple */[
                                  "Brancher.re",
                                  78,
                                  24
                                ]
                              ];
                        }
                        if (h.tag === /* Hole */6) {
                          var h$1 = h[0];
                          var pat = match[0];
                          var match$1 = List.nth(constructors, i);
                          var ti = match$1[1];
                          var xs = List.nth(newExCons, i);
                          if (!pat.tag) {
                            return /* tuple */[
                                    /* :: */[
                                      /* tuple */[
                                        pat[0],
                                        /* tuple */[
                                          ti,
                                          /* AnnRec */2
                                        ]
                                      ],
                                      gamma
                                    ],
                                    h$1,
                                    typ,
                                    xs
                                  ];
                          }
                          var x1 = pat[0];
                          if (x1.tag) {
                            return Pervasives.failwith("Sam took a shortcut and this isn't implemented yet. Blame him");
                          }
                          var x2 = pat[1];
                          if (x2.tag) {
                            return Pervasives.failwith("Sam took a shortcut and this isn't implemented yet. Blame him");
                          }
                          if (typeof ti === "number") {
                            throw [
                                  Caml_builtin_exceptions.match_failure,
                                  /* tuple */[
                                    "Brancher.re",
                                    84,
                                    36
                                  ]
                                ];
                          }
                          if (ti.tag === /* Pair_t */2) {
                            return /* tuple */[
                                    /* :: */[
                                      /* tuple */[
                                        x1[0],
                                        /* tuple */[
                                          ti[0],
                                          /* AnnRec */2
                                        ]
                                      ],
                                      /* :: */[
                                        /* tuple */[
                                          x2[0],
                                          /* tuple */[
                                            ti[1],
                                            /* AnnRec */2
                                          ]
                                        ],
                                        gamma
                                      ]
                                    ],
                                    h$1,
                                    typ,
                                    xs
                                  ];
                          }
                          throw [
                                Caml_builtin_exceptions.match_failure,
                                /* tuple */[
                                  "Brancher.re",
                                  84,
                                  36
                                ]
                              ];
                        } else {
                          throw [
                                Caml_builtin_exceptions.match_failure,
                                /* tuple */[
                                  "Brancher.re",
                                  78,
                                  24
                                ]
                              ];
                        }
                      }), branches);
                return /* tuple */[
                        exp,
                        goals,
                        unevalCons
                      ];
              }), es);
}

function branch(delta, gamma, typ, exs) {
  var datatypes = List.sort_uniq((function (t1, t2) {
          return 0;
        }), List.map((function (t) {
              if (typeof t === "number" || t.tag !== /* D */3) {
                return Pervasives.failwith("Error in branch");
              } else {
                return t[0];
              }
            }), List.filter((function (t) {
                    if (typeof t === "number" || t.tag !== /* D */3) {
                      return false;
                    } else {
                      return true;
                    }
                  }))(List.map((function (param) {
                      return param[1][0];
                    }), gamma))));
  return List.concat(List.map((function (d) {
                    return branch_indiv(delta, gamma, typ, exs, d);
                  }), datatypes));
}

exports.simplifyConstructor = simplifyConstructor;
exports.branch = branch;
exports.branch_indiv = branch_indiv;
exports.distribute = distribute;
/* No side effect */
