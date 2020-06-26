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

function parse_bool(x) {
  var match = parse_token(x);
  return /* tuple */[
          Pervasives.bool_of_string(match[0]),
          match[1]
        ];
}

function parse_type_(_x) {
  while(true) {
    var x = _x;
    if (x) {
      var match = x[0];
      if (match < 60) {
        var switcher = match - 11 | 0;
        if (switcher > 32 || switcher < 0) {
          if ((switcher + 2 >>> 0) <= 36) {
            _x = x[1];
            continue ;
          }
          
        } else if (switcher >= 21) {
          switch (switcher - 21 | 0) {
            case 0 :
            case 8 :
            case 9 :
                _x = x[1];
                continue ;
            case 1 :
            case 2 :
            case 3 :
            case 4 :
            case 5 :
            case 6 :
            case 7 :
            case 10 :
            case 11 :
                break;
            
          }
        }
        
      } else if (match >= 63) {
        switch (match) {
          case 97 :
              return /* tuple */[
                      /* Any_t */3,
                      x[1]
                    ];
          case 98 :
              return /* tuple */[
                      /* Bool_t */1,
                      x[1]
                    ];
          case 99 :
              var match$1 = parse_type_(x[1]);
              var match$2 = parse_type_(match$1[1]);
              return /* tuple */[
                      /* Cons_t */Block.__(0, [
                          match$1[0],
                          match$2[0]
                        ]),
                      match$2[1]
                    ];
          case 102 :
              var x$1 = x[1];
              var exit = 0;
              if (x$1 && x$1[0] === 97) {
                var match$3 = x$1[1];
                if (match$3 && match$3[0] === 105) {
                  var match$4 = match$3[1];
                  if (match$4) {
                    if (match$4[0] === 108) {
                      return /* tuple */[
                              /* Fail_t */4,
                              match$4[1]
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
                var match$5 = parse_type_(x$1);
                var match$6 = parse_type_(match$5[1]);
                return /* tuple */[
                        /* Function_t */Block.__(1, [
                            match$5[0],
                            match$6[0]
                          ]),
                        match$6[1]
                      ];
              }
              break;
          case 105 :
              return /* tuple */[
                      /* Int_t */0,
                      x[1]
                    ];
          case 112 :
              var match$7 = parse_type_(x[1]);
              var match$8 = parse_type_(match$7[1]);
              return /* tuple */[
                      /* Pair_t */Block.__(2, [
                          match$7[0],
                          match$8[0]
                        ]),
                      match$8[1]
                    ];
          case 100 :
          case 101 :
          case 103 :
          case 104 :
          case 106 :
          case 107 :
          case 108 :
          case 109 :
          case 110 :
          case 111 :
          case 113 :
          case 114 :
          case 115 :
          case 116 :
              break;
          case 117 :
              return /* tuple */[
                      /* Unit_t */2,
                      x[1]
                    ];
          default:
            
        }
      } else if (match !== 61) {
        _x = x[1];
        continue ;
      }
      
    }
    return Pervasives.failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an type_, I got \"" + (implode(x) + "\" which doesn't match any of the expected tags: ['fail', 'i', 'b', 'c', 'f', 'u', 'p', 'a']"));
  };
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
    var match = x[0];
    if (match >= 11) {
      switch (match) {
        case 48 :
        case 49 :
        case 50 :
        case 51 :
        case 52 :
        case 53 :
        case 54 :
        case 55 :
        case 56 :
        case 57 :
            break;
        case 59 :
            return /* tuple */[
                    /* [] */0,
                    x[1]
                  ];
        case 33 :
        case 34 :
        case 35 :
        case 36 :
        case 37 :
        case 38 :
        case 39 :
        case 42 :
        case 43 :
        case 46 :
        case 47 :
        case 58 :
        case 61 :
            return /* tuple */[
                    /* [] */0,
                    x
                  ];
        case 32 :
        case 40 :
        case 41 :
        case 44 :
        case 45 :
        case 60 :
        case 62 :
            _x = x[1];
            continue ;
        default:
          return /* tuple */[
                  /* [] */0,
                  x
                ];
      }
    } else {
      if (match < 9) {
        return /* tuple */[
                /* [] */0,
                x
              ];
      }
      _x = x[1];
      continue ;
    }
    var match$1 = parse_int(x);
    var match$2 = parse_res(match$1[1]);
    var match$3 = parse_environment(match$2[1]);
    return /* tuple */[
            /* :: */[
              /* tuple */[
                match$1[0],
                match$2[0]
              ],
              match$3[0]
            ],
            match$3[1]
          ];
  };
}

function parse_exp(_x) {
  while(true) {
    var x = _x;
    if (x) {
      var match = x[0];
      if (match >= 11) {
        switch (match) {
          case 32 :
          case 40 :
          case 41 :
          case 44 :
          case 45 :
          case 60 :
          case 62 :
              _x = x[1];
              continue ;
          case 92 :
              var match$1 = parse_int(x[1]);
              var match$2 = parse_type_(match$1[1]);
              var match$3 = parse_exp(match$2[1]);
              return /* tuple */[
                      /* Function */Block.__(4, [
                          match$1[0],
                          match$2[0],
                          match$3[0]
                        ]),
                      match$3[1]
                    ];
          case 97 :
              var match$4 = parse_exp(x[1]);
              var match$5 = parse_exp(match$4[1]);
              return /* tuple */[
                      /* Application */Block.__(5, [
                          match$4[0],
                          match$5[0]
                        ]),
                      match$5[1]
                    ];
          case 98 :
              var match$6 = parse_bool(x[1]);
              return /* tuple */[
                      /* Bool */Block.__(2, [match$6[0]]),
                      match$6[1]
                    ];
          case 99 :
              var match$7 = parse_exp(x[1]);
              var match$8 = parse_exp(match$7[1]);
              return /* tuple */[
                      /* Cons */Block.__(3, [
                          match$7[0],
                          match$8[0]
                        ]),
                      match$8[1]
                    ];
          case 102 :
              var match$9 = x[1];
              if (match$9) {
                var match$10 = match$9[0];
                if (match$10 !== 108) {
                  if (match$10 === 115) {
                    var match$11 = match$9[1];
                    if (match$11 && match$11[0] === 116) {
                      var match$12 = parse_exp(match$11[1]);
                      return /* tuple */[
                              /* Fst */Block.__(9, [match$12[0]]),
                              match$12[1]
                            ];
                    }
                    
                  }
                  
                } else {
                  var match$13 = match$9[1];
                  if (match$13 && match$13[0] === 111) {
                    var match$14 = match$13[1];
                    if (match$14 && match$14[0] === 97) {
                      var match$15 = match$14[1];
                      if (match$15 && match$15[0] === 116) {
                        var match$16 = parse_float(match$15[1]);
                        return /* tuple */[
                                /* Float */Block.__(1, [match$16[0]]),
                                match$16[1]
                              ];
                      }
                      
                    }
                    
                  }
                  
                }
              }
              break;
          case 104 :
              var match$17 = parse_int(x[1]);
              return /* tuple */[
                      /* Hole */Block.__(6, [match$17[0]]),
                      match$17[1]
                    ];
          case 105 :
              var match$18 = parse_int(x[1]);
              return /* tuple */[
                      /* Int */Block.__(0, [match$18[0]]),
                      match$18[1]
                    ];
          case 110 :
              return /* tuple */[
                      /* Nil */0,
                      x[1]
                    ];
          case 112 :
              var match$19 = parse_exp(x[1]);
              var match$20 = parse_exp(match$19[1]);
              return /* tuple */[
                      /* Pair */Block.__(8, [
                          match$19[0],
                          match$20[0]
                        ]),
                      match$20[1]
                    ];
          case 115 :
              var match$21 = parse_exp(x[1]);
              return /* tuple */[
                      /* Snd */Block.__(10, [match$21[0]]),
                      match$21[1]
                    ];
          case 33 :
          case 34 :
          case 35 :
          case 36 :
          case 37 :
          case 38 :
          case 39 :
          case 42 :
          case 43 :
          case 46 :
          case 47 :
          case 48 :
          case 49 :
          case 50 :
          case 51 :
          case 52 :
          case 53 :
          case 54 :
          case 55 :
          case 56 :
          case 57 :
          case 58 :
          case 59 :
          case 61 :
          case 63 :
          case 64 :
          case 65 :
          case 66 :
          case 67 :
          case 68 :
          case 69 :
          case 70 :
          case 71 :
          case 72 :
          case 73 :
          case 74 :
          case 75 :
          case 76 :
          case 77 :
          case 78 :
          case 79 :
          case 80 :
          case 81 :
          case 82 :
          case 83 :
          case 84 :
          case 85 :
          case 86 :
          case 87 :
          case 88 :
          case 89 :
          case 90 :
          case 91 :
          case 93 :
          case 94 :
          case 95 :
          case 96 :
          case 100 :
          case 101 :
          case 103 :
          case 106 :
          case 107 :
          case 108 :
          case 109 :
          case 111 :
          case 113 :
          case 114 :
          case 116 :
              break;
          case 117 :
              return /* tuple */[
                      /* Unit */1,
                      x[1]
                    ];
          case 118 :
              var match$22 = parse_int(x[1]);
              return /* tuple */[
                      /* Var */Block.__(7, [match$22[0]]),
                      match$22[1]
                    ];
          default:
            
        }
      } else if (match >= 9) {
        _x = x[1];
        continue ;
      }
      
    }
    return Pervasives.failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an exp, I got \"" + (implode(x) + "\" which doesn't match any of the expected tags: ['float', 'fst', '\\\\', 'i', 'b', 'c', 'n', 'a', 'h', 'u', 'v', 'p', 's']"));
  };
}

function parse_res(_x) {
  while(true) {
    var x = _x;
    if (x) {
      var switcher = x[0] - 9 | 0;
      if (switcher > 23 || switcher < 0) {
        switch (switcher) {
          case 31 :
          case 32 :
          case 35 :
          case 36 :
          case 51 :
          case 53 :
              _x = x[1];
              continue ;
          case 83 :
              var match = parse_int(x[1]);
              var match$1 = parse_type_(match[1]);
              var match$2 = parse_exp(match$1[1]);
              var match$3 = parse_environment(match$2[1]);
              return /* tuple */[
                      /* Rfunc */Block.__(4, [
                          match[0],
                          match$1[0],
                          match$2[0],
                          match$3[0]
                        ]),
                      match$3[1]
                    ];
          case 88 :
              var match$4 = parse_res(x[1]);
              var match$5 = parse_res(match$4[1]);
              return /* tuple */[
                      /* Rapp */Block.__(5, [
                          match$4[0],
                          match$5[0]
                        ]),
                      match$5[1]
                    ];
          case 89 :
              var match$6 = parse_bool(x[1]);
              return /* tuple */[
                      /* Rbool */Block.__(2, [match$6[0]]),
                      match$6[1]
                    ];
          case 90 :
              var match$7 = parse_res(x[1]);
              var match$8 = parse_res(match$7[1]);
              return /* tuple */[
                      /* Rcons */Block.__(3, [
                          match$7[0],
                          match$8[0]
                        ]),
                      match$8[1]
                    ];
          case 93 :
              var match$9 = x[1];
              if (match$9) {
                var match$10 = match$9[0];
                if (match$10 !== 108) {
                  if (match$10 === 115) {
                    var match$11 = match$9[1];
                    if (match$11 && match$11[0] === 116) {
                      var match$12 = parse_res(match$11[1]);
                      return /* tuple */[
                              /* Rfst */Block.__(8, [match$12[0]]),
                              match$12[1]
                            ];
                    }
                    
                  }
                  
                } else {
                  var match$13 = match$9[1];
                  if (match$13 && match$13[0] === 111) {
                    var match$14 = match$13[1];
                    if (match$14 && match$14[0] === 97) {
                      var match$15 = match$14[1];
                      if (match$15 && match$15[0] === 116) {
                        var match$16 = parse_float(match$15[1]);
                        return /* tuple */[
                                /* Rfloat */Block.__(1, [match$16[0]]),
                                match$16[1]
                              ];
                      }
                      
                    }
                    
                  }
                  
                }
              }
              break;
          case 95 :
              var match$17 = parse_int(x[1]);
              var match$18 = parse_environment(match$17[1]);
              return /* tuple */[
                      /* Rhole */Block.__(6, [
                          match$17[0],
                          match$18[0]
                        ]),
                      match$18[1]
                    ];
          case 96 :
              var match$19 = parse_int(x[1]);
              return /* tuple */[
                      /* Rint */Block.__(0, [match$19[0]]),
                      match$19[1]
                    ];
          case 101 :
              return /* tuple */[
                      /* Rnil */0,
                      x[1]
                    ];
          case 103 :
              var match$20 = parse_res(x[1]);
              var match$21 = parse_res(match$20[1]);
              return /* tuple */[
                      /* Rpair */Block.__(7, [
                          match$20[0],
                          match$21[0]
                        ]),
                      match$21[1]
                    ];
          case 106 :
              var match$22 = parse_res(x[1]);
              return /* tuple */[
                      /* Rsnd */Block.__(9, [match$22[0]]),
                      match$22[1]
                    ];
          case 33 :
          case 34 :
          case 37 :
          case 38 :
          case 39 :
          case 40 :
          case 41 :
          case 42 :
          case 43 :
          case 44 :
          case 45 :
          case 46 :
          case 47 :
          case 48 :
          case 49 :
          case 50 :
          case 52 :
          case 54 :
          case 55 :
          case 56 :
          case 57 :
          case 58 :
          case 59 :
          case 60 :
          case 61 :
          case 62 :
          case 63 :
          case 64 :
          case 65 :
          case 66 :
          case 67 :
          case 68 :
          case 69 :
          case 70 :
          case 71 :
          case 72 :
          case 73 :
          case 74 :
          case 75 :
          case 76 :
          case 77 :
          case 78 :
          case 79 :
          case 80 :
          case 81 :
          case 82 :
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
    return Pervasives.failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an res, I got \"" + (implode(x) + "\" which doesn't match any of the expected tags: ['float', 'fst', '\\\\', 'i', 'b', 'c', 'n', 'a', 'h', 'u', 'p', 's']"));
  };
}

function parse_float(x) {
  var match = parse_token(x);
  return /* tuple */[
          Caml_format.caml_float_of_string(match[0]),
          match[1]
        ];
}

function parse_int(x) {
  var match = parse_token(x);
  return /* tuple */[
          Caml_format.caml_int_of_string(match[0]),
          match[1]
        ];
}

function parse_value(_x) {
  while(true) {
    var x = _x;
    if (x) {
      var match = x[0];
      if (match >= 63) {
        if (match >= 106) {
          if (match !== 112) {
            if (match === 117) {
              return /* tuple */[
                      /* Vunit */0,
                      x[1]
                    ];
            }
            
          } else {
            var match$1 = parse_value(x[1]);
            var match$2 = parse_value(match$1[1]);
            return /* tuple */[
                    /* Vpair */Block.__(2, [
                        match$1[0],
                        match$2[0]
                      ]),
                    match$2[1]
                  ];
          }
        } else if (match !== 98) {
          if (match >= 105) {
            var match$3 = parse_int(x[1]);
            return /* tuple */[
                    /* Vint */Block.__(0, [match$3[0]]),
                    match$3[1]
                  ];
          }
          
        } else {
          var match$4 = parse_bool(x[1]);
          return /* tuple */[
                  /* Vbool */Block.__(1, [match$4[0]]),
                  match$4[1]
                ];
        }
      } else if (match >= 44) {
        if (match >= 60) {
          if (match !== 61) {
            _x = x[1];
            continue ;
          }
          
        } else if (match < 46) {
          _x = x[1];
          continue ;
        }
        
      } else if (match >= 11) {
        if (match >= 32) {
          switch (match - 32 | 0) {
            case 0 :
            case 8 :
            case 9 :
                _x = x[1];
                continue ;
            case 1 :
            case 2 :
            case 3 :
            case 4 :
            case 5 :
            case 6 :
            case 7 :
            case 10 :
            case 11 :
                break;
            
          }
        }
        
      } else if (match >= 9) {
        _x = x[1];
        continue ;
      }
      
    }
    return Pervasives.failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an value, I got \"" + (implode(x) + "\" which doesn't match any of the expected tags: ['i', 'b', 'u', 'p']"));
  };
}

function parse_context(_x) {
  while(true) {
    var x = _x;
    if (!x) {
      return /* tuple */[
              /* [] */0,
              x
            ];
    }
    var match = x[0];
    if (match >= 11) {
      switch (match) {
        case 48 :
        case 49 :
        case 50 :
        case 51 :
        case 52 :
        case 53 :
        case 54 :
        case 55 :
        case 56 :
        case 57 :
            break;
        case 59 :
            return /* tuple */[
                    /* [] */0,
                    x[1]
                  ];
        case 33 :
        case 34 :
        case 35 :
        case 36 :
        case 37 :
        case 38 :
        case 39 :
        case 42 :
        case 43 :
        case 46 :
        case 47 :
        case 58 :
        case 61 :
            return /* tuple */[
                    /* [] */0,
                    x
                  ];
        case 32 :
        case 40 :
        case 41 :
        case 44 :
        case 45 :
        case 60 :
        case 62 :
            _x = x[1];
            continue ;
        default:
          return /* tuple */[
                  /* [] */0,
                  x
                ];
      }
    } else {
      if (match < 9) {
        return /* tuple */[
                /* [] */0,
                x
              ];
      }
      _x = x[1];
      continue ;
    }
    var match$1 = parse_int(x);
    var match$2 = parse_type_(match$1[1]);
    var match$3 = parse_context(match$2[1]);
    return /* tuple */[
            /* :: */[
              /* tuple */[
                match$1[0],
                match$2[0]
              ],
              match$3[0]
            ],
            match$3[1]
          ];
  };
}

function parse_example(_x) {
  while(true) {
    var x = _x;
    if (x) {
      var match = x[0];
      if (match < 60) {
        var switcher = match - 11 | 0;
        if (switcher > 32 || switcher < 0) {
          if ((switcher + 2 >>> 0) <= 36) {
            _x = x[1];
            continue ;
          }
          
        } else if (switcher >= 21) {
          switch (switcher - 21 | 0) {
            case 0 :
            case 8 :
            case 9 :
                _x = x[1];
                continue ;
            case 1 :
            case 2 :
            case 3 :
            case 4 :
            case 5 :
            case 6 :
            case 7 :
            case 10 :
            case 11 :
                break;
            
          }
        }
        
      } else if (match >= 63) {
        switch (match) {
          case 98 :
              var match$1 = parse_bool(x[1]);
              return /* tuple */[
                      /* Ebool */Block.__(1, [match$1[0]]),
                      match$1[1]
                    ];
          case 102 :
              var match$2 = parse_value(x[1]);
              var match$3 = parse_example(match$2[1]);
              return /* tuple */[
                      /* Efunc */Block.__(3, [
                          match$2[0],
                          match$3[0]
                        ]),
                      match$3[1]
                    ];
          case 105 :
              var match$4 = parse_int(x[1]);
              return /* tuple */[
                      /* Eint */Block.__(0, [match$4[0]]),
                      match$4[1]
                    ];
          case 112 :
              var match$5 = parse_example(x[1]);
              var match$6 = parse_example(match$5[1]);
              return /* tuple */[
                      /* Epair */Block.__(2, [
                          match$5[0],
                          match$6[0]
                        ]),
                      match$6[1]
                    ];
          case 99 :
          case 100 :
          case 101 :
          case 103 :
          case 104 :
          case 106 :
          case 107 :
          case 108 :
          case 109 :
          case 110 :
          case 111 :
          case 113 :
          case 114 :
          case 115 :
              break;
          case 116 :
              return /* tuple */[
                      /* Top */0,
                      x[1]
                    ];
          case 117 :
              return /* tuple */[
                      /* Eunit */1,
                      x[1]
                    ];
          default:
            
        }
      } else if (match !== 61) {
        _x = x[1];
        continue ;
      }
      
    }
    return Pervasives.failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an example, I got \"" + (implode(x) + "\" which doesn't match any of the expected tags: ['t', 'u', 'i', 'b', 'p', 'f']"));
  };
}

function parse_hole_context(_x) {
  while(true) {
    var x = _x;
    if (!x) {
      return /* tuple */[
              /* [] */0,
              x
            ];
    }
    var match = x[0];
    if (match >= 11) {
      switch (match) {
        case 48 :
        case 49 :
        case 50 :
        case 51 :
        case 52 :
        case 53 :
        case 54 :
        case 55 :
        case 56 :
        case 57 :
            break;
        case 59 :
            return /* tuple */[
                    /* [] */0,
                    x[1]
                  ];
        case 33 :
        case 34 :
        case 35 :
        case 36 :
        case 37 :
        case 38 :
        case 39 :
        case 42 :
        case 43 :
        case 46 :
        case 47 :
        case 58 :
        case 61 :
            return /* tuple */[
                    /* [] */0,
                    x
                  ];
        case 32 :
        case 40 :
        case 41 :
        case 44 :
        case 45 :
        case 60 :
        case 62 :
            _x = x[1];
            continue ;
        default:
          return /* tuple */[
                  /* [] */0,
                  x
                ];
      }
    } else {
      if (match < 9) {
        return /* tuple */[
                /* [] */0,
                x
              ];
      }
      _x = x[1];
      continue ;
    }
    var match$1 = parse_int(x);
    var match$2 = parse_context(match$1[1]);
    var match$3 = parse_type_(match$2[1]);
    var match$4 = parse_hole_context(match$3[1]);
    return /* tuple */[
            /* :: */[
              /* tuple */[
                match$1[0],
                /* tuple */[
                  match$2[0],
                  match$3[0]
                ]
              ],
              match$4[0]
            ],
            match$4[1]
          ];
  };
}

function parse_filler_output(x) {
  parse_token(x);
  return Pervasives.failwith("filler_output_of_string Not Implemented");
}

function parse_unfilled_holes(x) {
  parse_token(x);
  return Pervasives.failwith("unfilled_holes_of_string Not Implemented");
}

function parse_debug_construct(_x) {
  while(true) {
    var x = _x;
    if (x) {
      var match = x[0];
      if (match < 60) {
        var switcher = match - 11 | 0;
        if (switcher > 32 || switcher < 0) {
          if ((switcher + 2 >>> 0) <= 36) {
            _x = x[1];
            continue ;
          }
          
        } else if (switcher >= 21) {
          switch (switcher - 21 | 0) {
            case 0 :
            case 8 :
            case 9 :
                _x = x[1];
                continue ;
            case 1 :
            case 2 :
            case 3 :
            case 4 :
            case 5 :
            case 6 :
            case 7 :
            case 10 :
            case 11 :
                break;
            
          }
        }
        
      } else if (match >= 63) {
        switch (match) {
          case 99 :
              var match$1 = Pervasives.failwith("parse_constraint_ Not Implemented");
              return /* tuple */[
                      /* Constraint_ */Block.__(5, [match$1[0]]),
                      match$1[1]
                    ];
          case 100 :
              var match$2 = parse_int(x[1]);
              return /* tuple */[
                      /* DB_Int */Block.__(8, [match$2[0]]),
                      match$2[1]
                    ];
          case 101 :
              var x$1 = x[1];
              var exit = 0;
              if (x$1) {
                var match$3 = x$1[0];
                if (match$3 !== 110) {
                  if (match$3 !== 120) {
                    exit = 2;
                  } else {
                    var match$4 = parse_example(x$1[1]);
                    return /* tuple */[
                            /* Example */Block.__(4, [match$4[0]]),
                            match$4[1]
                          ];
                  }
                } else {
                  var match$5 = x$1[1];
                  if (match$5 && match$5[0] === 118) {
                    var match$6 = parse_environment(match$5[1]);
                    return /* tuple */[
                            /* Environment */Block.__(1, [match$6[0]]),
                            match$6[1]
                          ];
                  }
                  exit = 2;
                }
              } else {
                exit = 2;
              }
              if (exit === 2) {
                var match$7 = parse_exp(x$1);
                return /* tuple */[
                        /* Exp */Block.__(0, [match$7[0]]),
                        match$7[1]
                      ];
              }
              break;
          case 102 :
              var match$8 = parse_filler_output(x[1]);
              return /* tuple */[
                      /* Filler_Output */Block.__(11, [match$8[0]]),
                      match$8[1]
                    ];
          case 103 :
              var match$9 = Pervasives.failwith("parse_guess_output Not Implemented");
              return /* tuple */[
                      /* Guess_Output */Block.__(9, [match$9[0]]),
                      match$9[1]
                    ];
          case 104 :
              var match$10 = parse_hole_context(x[1]);
              return /* tuple */[
                      /* Hole_Context */Block.__(7, [match$10[0]]),
                      match$10[1]
                    ];
          case 105 :
          case 106 :
          case 107 :
          case 108 :
          case 109 :
          case 110 :
          case 111 :
          case 112 :
          case 113 :
              break;
          case 114 :
              var match$11 = parse_res(x[1]);
              return /* tuple */[
                      /* Res */Block.__(2, [match$11[0]]),
                      match$11[1]
                    ];
          case 115 :
              var match$12 = parse_solver_output(x[1]);
              return /* tuple */[
                      /* Solver_Output */Block.__(10, [match$12[0]]),
                      match$12[1]
                    ];
          case 116 :
              var match$13 = parse_type_(x[1]);
              return /* tuple */[
                      /* Type_ */Block.__(3, [match$13[0]]),
                      match$13[1]
                    ];
          case 117 :
              var match$14 = parse_unfilled_holes(x[1]);
              return /* tuple */[
                      /* Unfilled_Holes */Block.__(13, [match$14[0]]),
                      match$14[1]
                    ];
          default:
            
        }
      } else if (match !== 61) {
        _x = x[1];
        continue ;
      }
      
    }
    return Pervasives.failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an debug_construct, I got \"" + (implode(x) + "\" which doesn't match any of the expected tags: ['env', 'ex', 'e', 'r', 't', 'c', 'c', 'h', 'd', 'g', 's', 'f', 'h', 'u', 'h', 'e', 'u']"));
  };
}

function parse_solver_output(x) {
  parse_token(x);
  return Pervasives.failwith("solver_output_of_string Not Implemented");
}

function parse_guess_output(param) {
  return Pervasives.failwith("parse_guess_output Not Implemented");
}

function parse_constraint_(param) {
  return Pervasives.failwith("parse_constraint_ Not Implemented");
}

function parse_unevalcons(x) {
  parse_token(x);
  return Pervasives.failwith("unevalcons_of_string Not Implemented");
}

function parse_excons(x) {
  parse_token(x);
  return Pervasives.failwith("excons_of_string Not Implemented");
}

function parse_hole_fillings(x) {
  parse_token(x);
  return Pervasives.failwith("hole_fillings_of_string Not Implemented");
}

exports.make_list = make_list;
exports.explode = explode;
exports.implode = implode;
exports.parse_token = parse_token;
exports.parse_exp = parse_exp;
exports.parse_res = parse_res;
exports.parse_type_ = parse_type_;
exports.parse_example = parse_example;
exports.parse_value = parse_value;
exports.parse_debug_construct = parse_debug_construct;
exports.parse_constraint_ = parse_constraint_;
exports.parse_unevalcons = parse_unevalcons;
exports.parse_excons = parse_excons;
exports.parse_bool = parse_bool;
exports.parse_hole_fillings = parse_hole_fillings;
exports.parse_hole_context = parse_hole_context;
exports.parse_unfilled_holes = parse_unfilled_holes;
exports.parse_context = parse_context;
exports.parse_int = parse_int;
exports.parse_filler_output = parse_filler_output;
exports.parse_solver_output = parse_solver_output;
exports.parse_float = parse_float;
exports.parse_environment = parse_environment;
exports.parse_guess_output = parse_guess_output;
/* No side effect */
