open Types;
//This is because I couldn't find List.make or List.create
let make_list (n:int, f:int=>'a):list('a) = {
    let out = ref([]);
    for (i in n-1 downto 0) {
        out := [f(i), ...out^]
    }
    out^
}
let explode(str:string):list(char) = 
//This is because I couldn't find String.to_seq
//    str |> String.to_seq |> List.of_seq 
    make_list(String.length(str), String.get(str))
let implode(cs:list(char)):string = 
//Because runtime doesn't matter
    String.init(List.length(cs), List.nth(cs))
let rec parse_token(x) = {
    let rec parse_token_r(x, y) = {
        switch(x) {
        | ['0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.', ..._] => 
            parse_token_r(List.tl(x), [List.hd(x),...y])
        | _ => (x,y)
        };
    }
    let (x,y) = parse_token_r(x,[]);
    (implode(List.rev(y)), x)
}
and parse_exp(x) = 
    switch(x) {
    | [' ' | '\t' | '\n', ...x] =>
        parse_exp(x)
    | ['f', 's', 't', ...x] =>
        let (v0, x) = parse_exp(x);
        (Fst(v0), x)
    | ['\\', ...x] =>
        let (v0, x) = parse_int(x);
        let (v1, x) = parse_exp(x);
        (Function(v0, v1), x)
    | ['i', ...x] =>
        let (v0, x) = parse_int(x);
        (Int(v0), x)
    | ['f', ...x] =>
        let (v0, x) = parse_float(x);
        (Float(v0), x)
    | ['b', ...x] =>
        let (v0, x) = parse_bool(x);
        (Bool(v0), x)
    | ['c', ...x] =>
        let (v0, x) = parse_exp(x);
        let (v1, x) = parse_exp(x);
        (Cons(v0, v1), x)
    | ['n', ...x] =>
        (Nil, x)
    | ['a', ...x] =>
        let (v0, x) = parse_exp(x);
        let (v1, x) = parse_exp(x);
        (Application(v0, v1), x)
    | ['h', ...x] =>
        let (v0, x) = parse_int(x);
        (Hole(v0), x)
    | ['u', ...x] =>
        (Unit, x)
    | ['v', ...x] =>
        let (v0, x) = parse_int(x);
        (Var(v0), x)
    | ['p', ...x] =>
        let (v0, x) = parse_exp(x);
        let (v1, x) = parse_exp(x);
        (Pair(v0, v1), x)
    | ['s', ...x] =>
        let (v0, x) = parse_exp(x);
        (Snd(v0), x)
    | _ => failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an exp, I got \"" ++ implode(x) ++ "\" which doesn't match any of the expected tags: ['fst', '\\\\', 'i', 'f', 'b', 'c', 'n', 'a', 'h', 'u', 'v', 'p', 's']")
    }
and parse_res(x) = 
    switch(x) {
    | [' ' | '\t' | '\n', ...x] =>
        parse_res(x)
    | ['f', 's', 't', ...x] =>
        let (v0, x) = parse_res(x);
        (Rfst(v0), x)
    | ['\\', ...x] =>
        let (v0, x) = parse_int(x);
        let (v1, x) = parse_exp(x);
        let (v2, x) = parse_environment(x);
        (Rfunc(v0, v1, v2), x)
    | ['i', ...x] =>
        let (v0, x) = parse_int(x);
        (Rint(v0), x)
    | ['f', ...x] =>
        let (v0, x) = parse_float(x);
        (Rfloat(v0), x)
    | ['b', ...x] =>
        let (v0, x) = parse_bool(x);
        (Rbool(v0), x)
    | ['c', ...x] =>
        let (v0, x) = parse_res(x);
        let (v1, x) = parse_res(x);
        (Rcons(v0, v1), x)
    | ['n', ...x] =>
        (Rnil, x)
    | ['a', ...x] =>
        let (v0, x) = parse_res(x);
        let (v1, x) = parse_res(x);
        (Rapp(v0, v1), x)
    | ['h', ...x] =>
        let (v0, x) = parse_int(x);
        let (v1, x) = parse_environment(x);
        (Rhole(v0, v1), x)
    | ['u', ...x] =>
        (Runit, x)
    | ['p', ...x] =>
        let (v0, x) = parse_res(x);
        let (v1, x) = parse_res(x);
        (Rpair(v0, v1), x)
    | ['s', ...x] =>
        let (v0, x) = parse_res(x);
        (Rsnd(v0), x)
    | _ => failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an res, I got \"" ++ implode(x) ++ "\" which doesn't match any of the expected tags: ['fst', '\\\\', 'i', 'f', 'b', 'c', 'n', 'a', 'h', 'u', 'p', 's']")
    }
and parse_type_(x) = 
    switch(x) {
    | [' ' | '\t' | '\n', ...x] =>
        parse_type_(x)
    | ['f', 'a', 'i', 'l', ...x] =>
        (Fail_t, x)
    | ['i', ...x] =>
        (Int_t, x)
    | ['b', ...x] =>
        (Bool_t, x)
    | ['c', ...x] =>
        let (v0, x) = parse_type_(x);
        let (v1, x) = parse_type_(x);
        (Cons_t(v0, v1), x)
    | ['f', ...x] =>
        let (v0, x) = parse_type_(x);
        let (v1, x) = parse_type_(x);
        (Function_t(v0, v1), x)
    | ['u', ...x] =>
        (Unit_t, x)
    | ['p', ...x] =>
        let (v0, x) = parse_type_(x);
        let (v1, x) = parse_type_(x);
        (Pair_t(v0, v1), x)
    | ['a', ...x] =>
        (Any_t, x)
    | _ => failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an type_, I got \"" ++ implode(x) ++ "\" which doesn't match any of the expected tags: ['fail', 'i', 'b', 'c', 'f', 'u', 'p', 'a']")
    }
and parse_example(x) = 
    switch(x) {
    | [' ' | '\t' | '\n', ...x] =>
        parse_example(x)
    | ['t', ...x] =>
        (Top, x)
    | ['u', ...x] =>
        (Eunit, x)
    | ['i', ...x] =>
        let (v0, x) = parse_int(x);
        (Eint(v0), x)
    | ['b', ...x] =>
        let (v0, x) = parse_bool(x);
        (Ebool(v0), x)
    | ['p', ...x] =>
        let (v0, x) = parse_example(x);
        let (v1, x) = parse_example(x);
        (Epair(v0, v1), x)
    | ['f', ...x] =>
        let (v0, x) = parse_value(x);
        let (v1, x) = parse_example(x);
        (Efunc(v0, v1), x)
    | _ => failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an example, I got \"" ++ implode(x) ++ "\" which doesn't match any of the expected tags: ['t', 'u', 'i', 'b', 'p', 'f']")
    }
and parse_value(x) = 
    switch(x) {
    | [' ' | '\t' | '\n', ...x] =>
        parse_value(x)
    | ['u', ...x] =>
        (Vunit, x)
    | ['p', ...x] =>
        let (v0, x) = parse_value(x);
        let (v1, x) = parse_value(x);
        (Vpair(v0, v1), x)
    | _ => failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an value, I got \"" ++ implode(x) ++ "\" which doesn't match any of the expected tags: ['u', 'p']")
    }
and parse_debug_construct(x) = 
    switch(x) {
    | [' ' | '\t' | '\n', ...x] =>
        parse_debug_construct(x)
    | ['e', 'n', 'v', ...x] =>
        let (v0, x) = parse_environment(x);
        (Environment(v0), x)
    | ['e', 'x', ...x] =>
        let (v0, x) = parse_example(x);
        (Example(v0), x)
    | ['e', ...x] =>
        let (v0, x) = parse_exp(x);
        (Exp(v0), x)
    | ['r', ...x] =>
        let (v0, x) = parse_res(x);
        (Res(v0), x)
    | ['t', ...x] =>
        let (v0, x) = parse_type_(x);
        (Type_(v0), x)
    | ['c', ...x] =>
        let (v0, x) = parse_constraint_(x);
        (Constraint_(v0), x)
    | _ => failwith("Some code generated by parser_generator.py is throwing a parse error:\nWhile parsing a/an debug_construct, I got \"" ++ implode(x) ++ "\" which doesn't match any of the expected tags: ['env', 'ex', 'e', 'r', 't', 'c']")
    }
and parse_int(x) = {
    let(v0, x) = parse_token(x);
    (int_of_string(v0), x)
}
and parse_float(x) = {
    let(v0, x) = parse_token(x);
    (float_of_string(v0), x)
}
and parse_environment(x) = {
    switch(x) {
    | [' ' | '\t' | '\n', ...x] =>
        parse_environment(x)
    | ['0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9', ..._] =>   
        let (v0, x) = parse_int(x);
        let (v1, x) = parse_res(x);
        let (v2, x) = parse_environment(x);
        ([(v0, v1), ...v2], x)
    | x => ([], x)
    }
}
and parse_constraint_(_) = {
    failwith("parse_constraint_ Not Implemented")
}
and parse_bool(x) = {
    let(v0, x) = parse_token(x);
    (bool_of_string(v0), x)
}
