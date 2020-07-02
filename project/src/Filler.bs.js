// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Guesser$MyNewProject = require("./Guesser.bs.js");
var Refiner$MyNewProject = require("./Refiner.bs.js");
var Brancher$MyNewProject = require("./Brancher.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");
var Unevaluator$MyNewProject = require("./unevaluator.bs.js");

function updateHoleContext_h(delta, gs) {
  if (!gs) {
    return delta;
  }
  var match = gs[0];
  var xs = updateHoleContext_h(delta, gs[1]);
  return /* :: */[
          /* tuple */[
            match[1],
            /* tuple */[
              match[0],
              match[2]
            ]
          ],
          xs
        ];
}

function updateHoleContext(delta, h, gs) {
  return List.filter((function (param) {
                  return h !== param[0];
                }))(updateHoleContext_h(delta, gs));
}

function updateUnfilledHoles(gs) {
  if (!gs) {
    return /* [] */0;
  }
  var match = gs[0];
  return /* :: */[
          /* tuple */[
            match[1],
            match[3]
          ],
          updateUnfilledHoles(gs[1])
        ];
}

function optionPred(x) {
  return x !== undefined;
}

function guessAndCheck_h(delta, gamma, typ, exs, _i) {
  while(true) {
    var i = _i;
    if (i > 8) {
      return ;
    }
    var es = Guesser$MyNewProject.guess(delta, gamma, typ, i);
    var checked = List.filter((function (e) {
              return optionPred(Unevaluator$MyNewProject.constrainExp(e, exs));
            }))(es);
    if (checked) {
      return checked[0];
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function guessAndCheck(delta, gamma, typ, exs) {
  return guessAndCheck_h(delta, gamma, typ, exs, 1);
}

function allBranchesFound(_xs) {
  while(true) {
    var xs = _xs;
    if (!xs) {
      return true;
    }
    if (xs[0] === undefined) {
      return false;
    }
    _xs = xs[1];
    continue ;
  };
}

function fill_h(delta, holeFillings, gamma, h, typ, exs) {
  if (Refiner$MyNewProject.refinable(typ)) {
    var match = Refiner$MyNewProject.refine(gamma, typ, exs);
    var gs = match[1];
    var f_000 = /* tuple */[
      h,
      match[0]
    ];
    var f = /* :: */[
      f_000,
      holeFillings
    ];
    var delta$prime = updateHoleContext(delta, h, gs);
    var u = updateUnfilledHoles(gs);
    var k = /* tuple */[
      u,
      f
    ];
    return /* tuple */[
            k,
            delta$prime
          ];
  }
  var e = guessAndCheck(delta, gamma, typ, exs);
  if (e !== undefined) {
    var f_000$1 = /* tuple */[
      h,
      e
    ];
    var f$1 = /* :: */[
      f_000$1,
      holeFillings
    ];
    var delta$prime$1 = List.filter((function (param) {
              return h !== param[0];
            }))(delta);
    var k$1 = /* tuple */[
      /* [] */0,
      f$1
    ];
    return /* tuple */[
            k$1,
            delta$prime$1
          ];
  }
  var bs = List.map((function (param) {
          var exp = param[0];
          var es = List.map((function (param) {
                  return guessAndCheck(delta, param[0], param[2], param[3]);
                }), param[1]);
          if (!allBranchesFound(es)) {
            return ;
          }
          if (typeof exp === "number") {
            throw [
                  Caml_builtin_exceptions.match_failure,
                  /* tuple */[
                    "Filler.re",
                    108,
                    36
                  ]
                ];
          }
          if (exp.tag === /* Case */12) {
            var expBranches = List.mapi((function (i, param) {
                    var e$prime$prime = List.nth(es, i);
                    if (e$prime$prime !== undefined) {
                      return /* tuple */[
                              param[0],
                              /* tuple */[
                                param[1][0],
                                e$prime$prime
                              ]
                            ];
                    }
                    throw [
                          Caml_builtin_exceptions.match_failure,
                          /* tuple */[
                            "Filler.re",
                            111,
                            44
                          ]
                        ];
                  }), exp[1]);
            return /* Case */Block.__(12, [
                      exp[0],
                      expBranches
                    ]);
          }
          throw [
                Caml_builtin_exceptions.match_failure,
                /* tuple */[
                  "Filler.re",
                  108,
                  36
                ]
              ];
        }), Brancher$MyNewProject.branch(delta, gamma, typ, exs));
  var match$1 = List.filter(optionPred)(bs);
  if (!match$1) {
    return ;
  }
  var e$prime = match$1[0];
  if (e$prime !== undefined) {
    var f_000$2 = /* tuple */[
      h,
      e$prime
    ];
    var f$2 = /* :: */[
      f_000$2,
      holeFillings
    ];
    var delta$prime$2 = List.filter((function (param) {
              return h !== param[0];
            }))(delta);
    var k$2 = /* tuple */[
      /* [] */0,
      f$2
    ];
    return /* tuple */[
            k$2,
            delta$prime$2
          ];
  }
  throw [
        Caml_builtin_exceptions.match_failure,
        /* tuple */[
          "Filler.re",
          120,
          16
        ]
      ];
}

function fill(delta, holeFillings, gamma, h, typ, exs) {
  var x = fill_h(delta, holeFillings, gamma, h, typ, exs);
  if (x !== undefined) {
    return x;
  } else {
    return Pervasives.failwith("Filler could not find candidate for hole");
  }
}

exports.updateHoleContext_h = updateHoleContext_h;
exports.updateHoleContext = updateHoleContext;
exports.updateUnfilledHoles = updateUnfilledHoles;
exports.optionPred = optionPred;
exports.guessAndCheck_h = guessAndCheck_h;
exports.guessAndCheck = guessAndCheck;
exports.allBranchesFound = allBranchesFound;
exports.fill = fill;
exports.fill_h = fill_h;
/* No side effect */
