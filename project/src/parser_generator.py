def p(_quit=''):
    out = []
    while True:
        out.append(input())
        if out[-1] == _quit:
            break
    return '\n'.join(out)

#{'exp':[('h', 'Hole', ['int']), ('var', 'Variable', ['int'])]}
def build(types):
    out = ["open Types;\n//This is because I couldn't find List.make or List.create\nlet make_list (n:int, f:int=>'a):list('a) = {\n    let out = ref([]);\n    for (i in n-1 downto 0) {\n        out := [f(i), ...out^]\n    }\n    out^\n}\nlet explode(str:string):list(char) = \n//This is because I couldn't find String.to_seq\n//    str |> String.to_seq |> List.of_seq \n    make_list(String.length(str), String.get(str))\nlet implode(cs:list(char)):string = \n//Because runtime doesn't matter\n    String.init(List.length(cs), List.nth(cs))\n\
let rec parse_token(x) = {\n    let rec parse_token_r(x, y) = {\n        switch(x) {\n        | ['0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.', ..._] => \n            parse_token_r(List.tl(x), [List.hd(x),...y])\n        | _ => (x,y)\n        };\n    }\n    let (x,y) = parse_token_r(x,[]);\n    (implode(List.rev(y)), x)\n}"]
    needed_parsers = set()
    for t in types:
        entry = types[t]
        join = "\n    | ["
        constructors = ["{0:}(x) = \n    switch(x) {{\n    | [' ' | '\\t' | '\\n', ...x] =>\n        parse_{0:}(x)".format(t)]
        footer = '\n    | _ => failwith("Some code generated by parser_generator.py is throwing a parse error:\\nWhile parsing a/an {}, I got \\"" ++ implode(x) ++ "\\" which doesn\'t match any of the expected tags: {}")\n    }}'.format(t, [c[0] for c in entry])
        for key, name, parameters in entry:
            terms = [", ".join(("'"+c+"'" for c in key) if key[0] != '\\' else ["'"+key+"'"]) + ", ...x] =>"]
            for i,p in enumerate(parameters):
                terms.append('let (v{}, x) = parse_{}(x);'.format(i,p))
                needed_parsers.add(p)
            terms.append("({}{}, x)".format(name, "("+", ".join("v{}".format(i) for i in range(len(parameters)))+")" if parameters else ""))
            constructors.append('\n        '.join(terms))
        out.append(join.join(constructors)+footer)
    for t in needed_parsers:
        if t not in types:
            out.append('{}(x) = {{\n    let(v0, x) = parse_token(x);\n    ({}_of_string(v0), x)\n}}'.format(t,t))

    return '\nand parse_'.join(out)+'\n'

#print(build({'exp':[('h', 'Hole', ['int']), ('var', 'Variable', ['int'])]}))



source = []
marker = '//marker for parser_generator.py'
for line in open('Types.re', 'r'):
    source.append(line)
    if line[:len(marker)] == marker:
        break
else:
    source = []
    print('Warning: No Marker')
source = '\n'.join(source)


def process(source):
    type_names = {}
    for line in source.split('\n'):
        if '//parser_generator.py: ignore' in line:
            continue
        line = line.strip()
        if line[:5] != 'type ' and line[:4] != 'and ':
            continue
        lst = line.split('=')
        if len(lst) != 2 or not lst[-1]:
            continue
        a, b = lst
        a, b = a.strip(), b.strip()#b.replace('.','_').split('(')[0].strip()
        a = a.split()
        if len(a) != 2:
            continue
        a = a[1]
        type_names[a] = b

    current_type = None
    members = {}
    for line in source.split('\n'):
        if '//parser_generator.py: ignore' in line:
            continue
        if line.strip() and line.strip()[-1] == '=':
            current_type = line.strip()[:-1].split()[-1]
            if current_type in members:
                raise ValueError()
            members[current_type] = []
        elif line.strip() and line.strip()[0] == '|':
            if '(' in line:
                try:
                    name, rest = line.strip()[1:].strip().split('(')
                except:
                    print(line)
                    raise
                parameters = rest.split(')')[0].split(', ')
                for i in range(len(parameters)):
                    while parameters[i] in type_names:
                        parameters[i] = type_names[parameters[i]]
            else:
                name, parameters = line.strip()[1:].strip(), []
            members[current_type] += [(name[0 if current_type != 'res' else 1].lower(), name, parameters)]

    return members

post_replacements = [
    ('and parse_environment(x) = {\n    let(v0, x) = parse_token(x);\n    (environment_of_string(v0), x)\n}',
     "and parse_environment(x) = {\n    switch(x) {\n    | [' ' | '\\t' | '\\n', ...x] =>\n        parse_environment(x)\n    | ['0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9', ..._] =>   \n        let (v0, x) = parse_int(x);\n        let (v1, x) = parse_res(x);\n        let (v2, x) = parse_environment(x);\n        ([(v0, v1), ...v2], x)\n    | x => ([], x)\n    }\n}"),

#    ("    | ['f', ...x] =>\n        let (v0, x) = parse_type_(x);\n        let (v1, x) = parse_type_(x);\n        (Function_t(v0, v1), x)\n",
#     "    | ['\\\\', ...x] =>\n        let (v0, x) = parse_type_(x);\n        let (v1, x) = parse_type_(x);\n        (Function_t(v0, v1), x)\n"),

#    ("    | ['f', ...x] =>\n        let (v0, x) = parse_int(x);\n        let (v1, x) = parse_exp(x);\n        let (v2, x) = parse_environment(x);\n        (Rfunc(v0, v1, v2), x)\n",
#     "    | ['\\\\', ...x] =>\n        let (v0, x) = parse_int(x);\n        let (v1, x) = parse_exp(x);\n        let (v2, x) = parse_environment(x);\n        (Rfunc(v0, v1, v2), x)\n"),

#    ("    | ['v','a','r', ...x] =>\n        let (v0, x) = parse_int(x);\n        (Var(v0), x)\n",
#     ""),
    
#    ("    | ['v', ...x] =>\n        let (v0, x) = parse_int(x);\n        (Variable(v0), x)\n",
#     "    | ['v','a','r', ...x] =>\n        let (v0, x) = parse_int(x);\n        (Var(v0), x)\n    | ['v', ...x] =>\n        let (v0, x) = parse_int(x);\n        (Variable(v0), x)\n"),

#    ("    | ['e', ...x] =>\n        let (v0, x) = parse_exp(x);\n        (Exp(v0), x)\n    | ['e', ...x] =>\n        let (v0, x) = parse_environment(x);\n        (Environemnt(v0), x)\n",
#     "    | ['e','n','v', ...x] =>\n        let (v0, x) = parse_environment(x);\n        (Environemnt(v0), x)\n    | ['e', ...x] =>\n        let (v0, x) = parse_exp(x);\n        (Exp(v0), x)\n")

    ('(Tools_pairlist_of_string(v0), x)',
     'failwith("Tools_pairlist_of_string Not Implemented")'),
    ('(constraint__of_string(v0), x)',
     'failwith("constraint__of_string Not Implemented")'),
]
def post_process(out):
    for a,b in post_replacements:
        out = out.replace(a,b)
    return out
mid_replacements = {
('f','Rfst',('res',)):('fst','Rfst',('res',)),
('f','Fst',('exp',)):('fst','Fst',('exp',)),
('v','Var',('int',)):('var','Var',('int',)),
('e','Environment',('environment',)):('env','Environment',('environment',)),
('f','Function',('int','exp')):('\\\\','Function',('int','exp')),
('f','Rfunc',('int','exp', 'environment')):('\\\\','Rfunc',('int','exp', 'environment')),
('f','Fail_t',()):('fail','Fail_t',())
    }
def mid_process(specs):
    for key in specs:
        for i,(a,b,c) in enumerate(specs[key]):
            if (a,b,tuple(c)) in mid_replacements:
                a2,b2,c2 = mid_replacements[(a,b,tuple(c))]
                del mid_replacements[(a,b,tuple(c))]
                specs[key][i] = [a2,b2,list(c2)]
        specs[key].sort(key=lambda x:len(x[0]), reverse=True)
    if mid_replacements:
        print(mid_replacements)
    return specs

def pipeline(string):
    return post_process(build(mid_process(process(string))))

def f():
    print(pipeline(p("QUIT")))

spec = {'exp': [('i', 'Int', ['int']), ('f', 'Float', ['float']), ('b', 'Bool', ['bool']), ('c', 'Cons', ['exp', 'exp']), ('n', 'Nil', []), ('v', 'Variable', ['int']), ('f', 'Function', ['int', 'exp']), ('a', 'Application', ['exp', 'exp']), ('h', 'Hole', ['int']), ('u', 'Unit', []), ('v', 'Var', ['int']), ('p', 'Pair', ['exp', 'exp']), ('f', 'Fst', ['exp']), ('s', 'Snd', ['exp'])], 'res': [('i', 'Rint', ['int']), ('f', 'Rfloat', ['float']), ('b', 'Rbool', ['bool']), ('c', 'Rcons', ['res', 'res']), ('n', 'Rnil', []), ('f', 'Rfunc', ['int', 'exp', 'environment']), ('a', 'Rapp', ['res', 'res']), ('h', 'Rhole', ['int', 'environment']), ('u', 'Runit', []), ('p', 'Rpair', ['res', 'res']), ('f', 'Rfst', ['res']), ('s', 'Rsnd', ['res'])], 'type_': [('i', 'Int_t', []), ('b', 'Bool_t', []), ('c', 'Cons_t', ['type_']), ('f', 'Function_t', ['type_', 'type_']), ('u', 'Unit_t', []), ('p', 'Pair_t', ['type_', 'type_']), ('a', 'Any_t', []), ('f', 'Fail_t', [])], 'debug_construct': [('e', 'Exp', ['exp']), ('e', 'Environemnt', ['environment']), ('r', 'Res', ['res'])]}

def save(out):
    open('Parser.re','w').write(out)
    
#print(pipeline(source))
save(pipeline(source))

