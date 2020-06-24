// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Pervasives = require("bs-platform/lib/js/pervasives.js");

function string_of_hole_identifier(prim) {
  return String(prim);
}

function string_of_env(e) {
  if (!e) {
    return "-";
  }
  var match = e[0];
  return String(match[0]) + ("->" + (string_of_res(match[1]) + ("; " + string_of_env(e[1]))));
}

function string_of_exp(e) {
  if (typeof e === "number") {
    if (e === /* Nil */0) {
      return "Nil";
    } else {
      return "()";
    }
  }
  switch (e.tag | 0) {
    case /* Float */1 :
        return e[0].toString();
    case /* Bool */2 :
        return Pervasives.string_of_bool(e[0]);
    case /* Cons */3 :
        return string_of_exp(e[0]) + ("::" + string_of_exp(e[1]));
    case /* Function */5 :
        return "\\" + (String(e[0]) + ("." + string_of_exp(e[1])));
    case /* Application */6 :
        return string_of_exp(e[0]) + (" " + string_of_exp(e[1]));
    case /* Hole */7 :
        return "??_" + String(e[0]);
    case /* Int */0 :
    case /* Variable */4 :
    case /* Var */8 :
        return String(e[0]);
    case /* Pair */9 :
        return "(" + (string_of_exp(e[0]) + (", " + (string_of_exp(e[1]) + ")")));
    case /* Fst */10 :
        return "fst(" + (string_of_exp(e[0]) + ")");
    case /* Snd */11 :
        return "snd(" + (string_of_exp(e[0]) + ")");
    
  }
}

function string_of_res(r) {
  if (typeof r === "number") {
    if (r === /* Rnil */0) {
      return "Nil";
    } else {
      return "()";
    }
  }
  switch (r.tag | 0) {
    case /* Rint */0 :
        return String(r[0]);
    case /* Rfloat */1 :
        return r[0].toString();
    case /* Rbool */2 :
        return Pervasives.string_of_bool(r[0]);
    case /* Rcons */3 :
        return string_of_res(r[0]) + ("::" + string_of_res(r[1]));
    case /* Rfunc */4 :
        return "[" + (string_of_env(r[2]) + ("]\\" + (String(r[0]) + ("." + string_of_exp(r[1])))));
    case /* Rapp */5 :
        return string_of_res(r[0]) + (" " + string_of_res(r[1]));
    case /* Rhole */6 :
        return "[" + (string_of_env(r[1]) + ("]??_" + String(r[0])));
    case /* Rpair */7 :
        return "(" + (string_of_res(r[0]) + (", " + (string_of_res(r[1]) + ")")));
    case /* Rfst */8 :
        return "fst(" + (string_of_res(r[0]) + ")");
    case /* Rsnd */9 :
        return "snd(" + (string_of_res(r[0]) + ")");
    
  }
}

function string_of_identifier(prim) {
  return String(prim);
}

function string_of_debug_construct(c) {
  switch (c.tag | 0) {
    case /* Exp */0 :
        return string_of_exp(c[0]);
    case /* Environment */1 :
        return string_of_env(c[0]);
    case /* Res */2 :
        return string_of_res(c[0]);
    
  }
}

exports.string_of_debug_construct = string_of_debug_construct;
exports.string_of_exp = string_of_exp;
exports.string_of_res = string_of_res;
exports.string_of_env = string_of_env;
exports.string_of_identifier = string_of_identifier;
exports.string_of_hole_identifier = string_of_hole_identifier;
/* No side effect */