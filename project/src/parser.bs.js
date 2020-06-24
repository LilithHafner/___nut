// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var $$String = require("bs-platform/lib/js/string.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");

function make_list(n, f) {
  var out = /* [] */0;
  for(var i = n - 1 | 0; i >= 0; --i){
    out = /* :: */[
      Curry._1(f, i),
      out
    ];
  }
  return out;
}

function explode(str) {
  return make_list(str.length, (function (param) {
                return Caml_string.get(str, param);
              }));
}

function implode(cs) {
  return $$String.init(List.length(cs), (function (param) {
                return List.nth(cs, param);
              }));
}

function parse_token(x) {
  var parse_token_r = function (_x, _y) {
    while(true) {
      var y = _y;
      var x = _x;
      if (!x) {
        return /* tuple */[
                x,
                y
              ];
      }
      var match = x[0];
      if (match >= 48) {
        if (match >= 58) {
          return /* tuple */[
                  x,
                  y
                ];
        }
        
      } else if (match !== 46) {
        return /* tuple */[
                x,
                y
              ];
      }
      _y = /* :: */[
        List.hd(x),
        y
      ];
      _x = List.tl(x);
      continue ;
    };
  };
  var match = parse_token_r(x, /* [] */0);
  return /* tuple */[
          implode(List.rev(match[1])),
          match[0]
        ];
}

function parse_exp(_x) {
  while(true) {
    var x = _x;
    if (x) {
      var switcher = x[0] - 9 | 0;
      if (switcher > 23 || switcher < 0) {
        switch (switcher) {
          case 83 :
              var match = parse_int(x[1]);
              var match$1 = parse_exp(match[1]);
              return /* tuple */[
                      /* Function */Block.__(5, [
                          match[0],
                          match$1[0]
                        ]),
                      match$1[1]
                    ];
          case 88 :
              var match$2 = parse_exp(x[1]);
              var match$3 = parse_exp(match$2[1]);
              return /* tuple */[
                      /* Application */Block.__(6, [
                          match$2[0],
                          match$3[0]
                        ]),
                      match$3[1]
                    ];
          case 89 :
              var match$4 = parse_bool(x[1]);
              return /* tuple */[
                      /* Bool */Block.__(2, [match$4[0]]),
                      match$4[1]
                    ];
          case 90 :
              var match$5 = parse_exp(x[1]);
              var match$6 = parse_exp(match$5[1]);
              return /* tuple */[
                      /* Cons */Block.__(3, [
                          match$5[0],
                          match$6[0]
                        ]),
                      match$6[1]
                    ];
          case 93 :
              var x$1 = x[1];
              var exit = 0;
              if (x$1 && x$1[0] === 115) {
                var match$7 = x$1[1];
                if (match$7 && match$7[0] === 116) {
                  var match$8 = parse_exp(match$7[1]);
                  return /* tuple */[
                          /* Fst */Block.__(10, [match$8[0]]),
                          match$8[1]
                        ];
                }
                exit = 2;
              } else {
                exit = 2;
              }
              if (exit === 2) {
                var match$9 = parse_float(x$1);
                return /* tuple */[
                        /* Float */Block.__(1, [match$9[0]]),
                        match$9[1]
                      ];
              }
              break;
          case 95 :
              var match$10 = parse_int(x[1]);
              return /* tuple */[
                      /* Hole */Block.__(7, [match$10[0]]),
                      match$10[1]
                    ];
          case 96 :
              var match$11 = parse_int(x[1]);
              return /* tuple */[
                      /* Int */Block.__(0, [match$11[0]]),
                      match$11[1]
                    ];
          case 101 :
              return /* tuple */[
                      /* Nil */0,
                      x[1]
                    ];
          case 103 :
              var match$12 = parse_exp(x[1]);
              var match$13 = parse_exp(match$12[1]);
              return /* tuple */[
                      /* Pair */Block.__(9, [
                          match$12[0],
                          match$13[0]
                        ]),
                      match$13[1]
                    ];
          case 106 :
              var match$14 = parse_exp(x[1]);
              return /* tuple */[
                      /* Snd */Block.__(11, [match$14[0]]),
                      match$14[1]
                    ];
          case 84 :
          case 85 :
          case 86 :
          case 87 :
          case 91 :
          case 92 :
          case 94 :
          case 97 :
          case 98 :
          case 99 :
          case 100 :
          case 102 :
          case 104 :
          case 105 :
          case 107 :
              break;
          case 108 :
              return /* tuple */[
                      /* Unit */1,
                      x[1]
                    ];
          case 109 :
              var x$2 = x[1];
              var exit$1 = 0;
              if (x$2 && x$2[0] === 97) {
                var match$15 = x$2[1];
                if (match$15 && match$15[0] === 114) {
                  var match$16 = parse_int(match$15[1]);
                  return /* tuple */[
                          /* Var */Block.__(8, [match$16[0]]),
                          match$16[1]
                        ];
                }
                exit$1 = 2;
              } else {
                exit$1 = 2;
              }
              if (exit$1 === 2) {
                var match$17 = parse_int(x$2);
                return /* tuple */[
                        /* Variable */Block.__(4, [match$17[0]]),
                        match$17[1]
                      ];
              }
              break;
          default:
            
        }
      } else if (switcher > 22 || switcher < 2) {
        _x = x[1];
        continue ;
      }
      
    }
    return Pervasives.failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an exp, I got \"" + (implode(x) + "\" which doesn't match any of the expected tags: ['var', 'fst', '\\\\', 'i', 'f', 'b', 'c', 'n', 'v', 'a', 'h', 'u', 'p', 's']"));
  };
}

function parse_res(_x) {
  while(true) {
    var x = _x;
    if (x) {
      var switcher = x[0] - 9 | 0;
      if (switcher > 23 || switcher < 0) {
        switch (switcher) {
          case 83 :
              var match = parse_int(x[1]);
              var match$1 = parse_exp(match[1]);
              var match$2 = parse_environment(match$1[1]);
              return /* tuple */[
                      /* Rfunc */Block.__(4, [
                          match[0],
                          match$1[0],
                          match$2[0]
                        ]),
                      match$2[1]
                    ];
          case 88 :
              var match$3 = parse_res(x[1]);
              var match$4 = parse_res(match$3[1]);
              return /* tuple */[
                      /* Rapp */Block.__(5, [
                          match$3[0],
                          match$4[0]
                        ]),
                      match$4[1]
                    ];
          case 89 :
              var match$5 = parse_bool(x[1]);
              return /* tuple */[
                      /* Rbool */Block.__(2, [match$5[0]]),
                      match$5[1]
                    ];
          case 90 :
              var match$6 = parse_res(x[1]);
              var match$7 = parse_res(match$6[1]);
              return /* tuple */[
                      /* Rcons */Block.__(3, [
                          match$6[0],
                          match$7[0]
                        ]),
                      match$7[1]
                    ];
          case 93 :
              var x$1 = x[1];
              var exit = 0;
              if (x$1 && x$1[0] === 115) {
                var match$8 = x$1[1];
                if (match$8 && match$8[0] === 116) {
                  var match$9 = parse_res(match$8[1]);
                  return /* tuple */[
                          /* Rfst */Block.__(8, [match$9[0]]),
                          match$9[1]
                        ];
                }
                exit = 2;
              } else {
                exit = 2;
              }
              if (exit === 2) {
                var match$10 = parse_float(x$1);
                return /* tuple */[
                        /* Rfloat */Block.__(1, [match$10[0]]),
                        match$10[1]
                      ];
              }
              break;
          case 95 :
              var match$11 = parse_int(x[1]);
              var match$12 = parse_environment(match$11[1]);
              return /* tuple */[
                      /* Rhole */Block.__(6, [
                          match$11[0],
                          match$12[0]
                        ]),
                      match$12[1]
                    ];
          case 96 :
              var match$13 = parse_int(x[1]);
              return /* tuple */[
                      /* Rint */Block.__(0, [match$13[0]]),
                      match$13[1]
                    ];
          case 101 :
              return /* tuple */[
                      /* Rnil */0,
                      x[1]
                    ];
          case 103 :
              var match$14 = parse_res(x[1]);
              var match$15 = parse_res(match$14[1]);
              return /* tuple */[
                      /* Rpair */Block.__(7, [
                          match$14[0],
                          match$15[0]
                        ]),
                      match$15[1]
                    ];
          case 106 :
              var match$16 = parse_res(x[1]);
              return /* tuple */[
                      /* Rsnd */Block.__(9, [match$16[0]]),
                      match$16[1]
                    ];
          case 84 :
          case 85 :
          case 86 :
          case 87 :
          case 91 :
          case 92 :
          case 94 :
          case 97 :
          case 98 :
          case 99 :
          case 100 :
          case 102 :
          case 104 :
          case 105 :
          case 107 :
              break;
          case 108 :
              return /* tuple */[
                      /* Runit */1,
                      x[1]
                    ];
          default:
            
        }
      } else if (switcher > 22 || switcher < 2) {
        _x = x[1];
        continue ;
      }
      
    }
    return Pervasives.failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an res, I got \"" + (implode(x) + "\" which doesn't match any of the expected tags: ['fst', '\\\\', 'i', 'f', 'b', 'c', 'n', 'a', 'h', 'u', 'p', 's']"));
  };
}

function parse_type_(_x) {
  while(true) {
    var x = _x;
    if (x) {
      var switcher = x[0] - 9 | 0;
      if (switcher > 23 || switcher < 0) {
        switch (switcher) {
          case 88 :
              return /* tuple */[
                      /* Any_t */3,
                      x[1]
                    ];
          case 89 :
              return /* tuple */[
                      /* Bool_t */1,
                      x[1]
                    ];
          case 90 :
              var match = parse_type_(x[1]);
              var match$1 = parse_type_(match[1]);
              return /* tuple */[
                      /* Cons_t */Block.__(0, [
                          match[0],
                          match$1[0]
                        ]),
                      match$1[1]
                    ];
          case 93 :
              var x$1 = x[1];
              var exit = 0;
              if (x$1 && x$1[0] === 97) {
                var match$2 = x$1[1];
                if (match$2 && match$2[0] === 105) {
                  var match$3 = match$2[1];
                  if (match$3) {
                    if (match$3[0] === 108) {
                      return /* tuple */[
                              /* Fail_t */4,
                              match$3[1]
                            ];
                    }
                    exit = 2;
                  } else {
                    exit = 2;
                  }
                } else {
                  exit = 2;
                }
              } else {
                exit = 2;
              }
              if (exit === 2) {
                var match$4 = parse_type_(x$1);
                var match$5 = parse_type_(match$4[1]);
                return /* tuple */[
                        /* Function_t */Block.__(1, [
                            match$4[0],
                            match$5[0]
                          ]),
                        match$5[1]
                      ];
              }
              break;
          case 96 :
              return /* tuple */[
                      /* Int_t */0,
                      x[1]
                    ];
          case 103 :
              var match$6 = parse_type_(x[1]);
              var match$7 = parse_type_(match$6[1]);
              return /* tuple */[
                      /* Pair_t */Block.__(2, [
                          match$6[0],
                          match$7[0]
                        ]),
                      match$7[1]
                    ];
          case 91 :
          case 92 :
          case 94 :
          case 95 :
          case 97 :
          case 98 :
          case 99 :
          case 100 :
          case 101 :
          case 102 :
          case 104 :
          case 105 :
          case 106 :
          case 107 :
              break;
          case 108 :
              return /* tuple */[
                      /* Unit_t */2,
                      x[1]
                    ];
          default:
            
        }
      } else if (switcher > 22 || switcher < 2) {
        _x = x[1];
        continue ;
      }
      
    }
    return Pervasives.failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an type_, I got \"" + (implode(x) + "\" which doesn't match any of the expected tags: ['fail', 'i', 'b', 'c', 'f', 'u', 'p', 'a']"));
  };
}

function parse_debug_construct(_x) {
  while(true) {
    var x = _x;
    if (x) {
      var match = x[0];
      if (match >= 33) {
        if (match !== 101) {
          if (match === 114) {
            var match$1 = parse_res(x[1]);
            return /* tuple */[
                    /* Res */Block.__(2, [match$1[0]]),
                    match$1[1]
                  ];
          }
          
        } else {
          var x$1 = x[1];
          var exit = 0;
          if (x$1 && x$1[0] === 110) {
            var match$2 = x$1[1];
            if (match$2 && match$2[0] === 118) {
              var match$3 = parse_environment(match$2[1]);
              return /* tuple */[
                      /* Environment */Block.__(1, [match$3[0]]),
                      match$3[1]
                    ];
            }
            exit = 2;
          } else {
            exit = 2;
          }
          if (exit === 2) {
            var match$4 = parse_exp(x$1);
            return /* tuple */[
                    /* Exp */Block.__(0, [match$4[0]]),
                    match$4[1]
                  ];
          }
          
        }
      } else if (match >= 11) {
        if (match >= 32) {
          _x = x[1];
          continue ;
        }
        
      } else if (match >= 9) {
        _x = x[1];
        continue ;
      }
      
    }
    return Pervasives.failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an debug_construct, I got \"" + (implode(x) + "\" which doesn't match any of the expected tags: ['env', 'e', 'r']"));
  };
}

function parse_int(x) {
  var match = parse_token(x);
  return /* tuple */[
          Caml_format.caml_int_of_string(match[0]),
          match[1]
        ];
}

function parse_bool(x) {
  var match = parse_token(x);
  return /* tuple */[
          Pervasives.bool_of_string(match[0]),
          match[1]
        ];
}

function parse_environment(_x) {
  while(true) {
    var x = _x;
    if (!x) {
      return /* tuple */[
              /* [] */0,
              x
            ];
    }
    var switcher = x[0] - 9 | 0;
    if (switcher > 23 || switcher < 0) {
      if (switcher > 48 || switcher < 39) {
        return /* tuple */[
                /* [] */0,
                x
              ];
      }
      var match = parse_int(x);
      var match$1 = parse_res(match[1]);
      var match$2 = parse_environment(match$1[1]);
      return /* tuple */[
              /* :: */[
                /* tuple */[
                  match[0],
                  match$1[0]
                ],
                match$2[0]
              ],
              match$2[1]
            ];
    }
    if (!(switcher > 22 || switcher < 2)) {
      return /* tuple */[
              /* [] */0,
              x
            ];
    }
    _x = x[1];
    continue ;
  };
}

function parse_float(x) {
  var match = parse_token(x);
  return /* tuple */[
          Caml_format.caml_float_of_string(match[0]),
          match[1]
        ];
}

exports.make_list = make_list;
exports.explode = explode;
exports.implode = implode;
exports.parse_token = parse_token;
exports.parse_exp = parse_exp;
exports.parse_res = parse_res;
exports.parse_type_ = parse_type_;
exports.parse_debug_construct = parse_debug_construct;
exports.parse_int = parse_int;
exports.parse_bool = parse_bool;
exports.parse_environment = parse_environment;
exports.parse_float = parse_float;
/* No side effect */
