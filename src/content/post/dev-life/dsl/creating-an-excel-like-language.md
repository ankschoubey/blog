---
excerpt: Using the best current programming language creation-tool.
title: How we created a query and evaluation language similar to Google Sheets and Excel formulas
comments: true
tags:
 - technical
 - clean-code
 - dsl
 - developer-diary
toc: false
use_math: true
publishDate: 2020-05-25T20:42:15.220865
slug: /software-blog/creating-an-excel-like-language/
image: https://upload.wikimedia.org/wikipedia/commons/e/e2/Spreadsheet.png
image-fit: contain
---

I had the opportunity to be part of a team that created a programming language. Building a programming language includes too many steps and it’ll be unfair of me to say I know all of it. Therefore, I have added many resources that I used at the end of this article.

We used a tool called Antlr that helped us skip some hard stages.

The following article describes;

1. What was built?
2. How to build an expression language? What decisions did we take?
3. Make it like Google Sheets Building Evaluation

## What was built?

My team recently created an expression language for rest APIs. The expression language would work like this.

If someone calls a REST API, they can send a query like this

```
/rest/v1/users?query=“$name==‘Ankush’ & $age >= 25”
```

Then they only would receive that particular data.

This same can be used for building formulas that can be used for excel like functionality.

For example, suppose your data model is called User and it consists of the following record

```json
{
“firstName”: “Ankush”,
“lastName”: “Choubey”
}
```

You can write an expression in a map form like

```json
{
  “fullName”: “concat($firstName, ‘ ‘, $lastName)”
}
```

The result would be adding an additional field resulting in

```json
{
“firstName”: “Ankush”,
“lastName”: “Choubey”,
“fullName”: “Ankush Choubey”
}
```

The expression language supports arithmetic operators, logical operators, functions, etc.

This article explains how we build the expression language.

## How to build an expression language? What decisions did we take?

Building your own programming language involves 5 steps.

1. Tokenisation
2. Lexical Analysis
3. Semantic Analysis
4. Compiling
5. Execution

Each language is made up of distinct items. For example, this could be keywords like if, else, for, functions, numbers, strings, etc. these are all tokens.

The Lexical analysis is a step that converts the stream of tokens into a parse tree.

![](https://tomassetti.me/wp-content/uploads/2017/01/antlr4_parse_tree.png)

Semantic analysis means understanding what each node means.

For example, if someone is performing equals on an unequal datatype, it should fail, $firstName == 1 should result in an error because firstName is a string field.

Compiling is generating the machine-executable code.

We went for building a transpiler. A transpiler is a piece of code that converts one language to another language.

We went for a transpiler from our expression language to MongoDB Queries.

## How we built it?

The compiler world has become pretty mature. There are many tools available that help you get more than halfway through without effort.

We settled on a tool called Antlr.

In Antlr, we can describe the grammar of our programming language and it would generate code that would automatically do the first two stages, tokenization and lexical analysis.

Antlr would also generate Abstract Classes and Interfaces that we can extend. So, we extended those Interfaces and built our transpiler.

For example, suppose you want to compare two strings.

```
'string one' == 'string two'
```

You would write an Antlr grammar like the following

```
equality: value == value; #equality
value: [a-zA-z]+ #value
```

Antlr would generate a Visitor interface and implementation which would be something like this

```
type visitEquality(Expression.EqualityContext ctx);

type visitValue(Expression.ValueContext ctx);
```

We can then create a concrete implementation which would be something like this

```
String visitEquality(Expression.EqualityContext ctx){
  String left = visit(ctx.children().get(0))
  String right = visit(ctx.children().get(0))
  return
}

String visitValue(Expression.ValueContext ctx){
  return ctx.getText();
}
```

Antlr provided tokenizer and we would parse that and send it to Visitors. The visitors would generate MongoDB Queries.

## Making it like Excel and Google Sheets i.e. Building Evaluation

![](https://upload.wikimedia.org/wikipedia/commons/e/e2/Spreadsheet.png)

Building evaluation was also easy. There were some edge cases that we took care of:

1. Google Sheets allows for the conversion of data types
2. One cell with a formula can refer to another cell

### Google Sheets allows for the conversion of data types

In Google Sheets, if you have a string + number, the evaluation is as follows:

1. If the string can be converted to a number then it would be converted to a number, `'1'+1` is equal to `2`
2. If we have two strings still it would get converted to the number `'1' + '1'` = `2`
3. If any number cannot be converted to a string, we’ll throw an error.

To achieve this functionality we converted all values passed to the `+` operator to numbers using MongoDB’s `toDouble` method. For example,

`'1' + '2'` would become `{$add: [toInt('1'), toInt('2')]}`

We did similar to other functions we had, for example for concat we converted everything to String using MongoDB’s `toString` method.

### One cell with a formula can refer to another cell

Suppose we received multiple formulas where one formula refers to another, for example

```
{
  "formulaOne": "$field1 + 20",
  "formulaTwo": "$formulaOne + 40",
}
```

Suppose in the database, the value of field `$field1` is `20`, then the evaluation output should be

```
{
  "field1": 20
  "formulaOne": 40,
  "formulaTwo": 80,
}
```

We also don’t want a race condition in formula. For example, if `field1` refers to `field2`, `field2` should not refer `field1`.

So the following case is invalid

```
{
  "someFormula1": "$someFormula2 + 1",
  "someFormula2": "$someFormula1 + 2",
}
```

To achieve both these, we did a tree walk.

We know what formula names are: `["formulaOne", "formulaTwo"]` let's set this to a variable

```java
List<String> formulaFieldNames = formulasMap.getKeys();
```

Now we can do a DFS and resolve each formula, if the formula has another formula, we’ll substitute that formula.

```json
void dfsResolveFormulas(String currentFormulaField, String currentFormulaValue, List<String> formulas, Map<String,String> originalMap, Map<String,String> resolvedMap, List<String> path){

  if(path.contains(currentFormulaField)){
    //INFO: path list keeps track of race conditions in formula
    throw RaceAroundCondition("There is race around condition in formula")
  }
  if(resolvedMap.contains(currentFormulaField)){
    return;
  }
  path.add(currentFormulaField);
  for(String formula: formulas){
    if(currentFormulaValue.contains(formula)){
      dfsResolveFormulas(formula, originalMap.get(formula), formulas, originalMap, resolvedMap);
    }
    currentFormulaValue= currentFormulaValue.replace(formula, resolvedMap())
  }
  resolvedMap.put(currentFormulaField, currentFormulaValue)
  path.remove(currentFormulaField);
}
```

The following code achieves the following

Given these formulas

```
{
  "formulaOne": "$field1 + 20",
  "formulaTwo": "$formulaOne + 40",
}
```

It would resolve them to

```
{
  "formulaOne": "$field1 + 20",
  "formulaTwo": "$field1 + 20 + 40",
}
```

Now no formulas depend on each other.

And in the case of race conditions, when we try to walk the tree, in the following example

```
{
  "someFormula1": "$someFormula2 + 1",
  "someFormula2": "$someFormula1 + 2",
}
```

1. During the first walk, we would have `someFormula1`. The path variable would be `["someFormula1"]`.
2. During the second walk, we would have `someFormula2` added. The path variable would become `["someFormula1", "someFormula2"]`.
3. Now again we would try to walk `someFormula1`. But as we see the path variable already contains `someFormula1` so we’ll throw an error.

## Lessons

Building a programming language was easier than we initially thought. And it was a lot of fun. It was a developer checklist item that I needed because it boosted my confidence.

The compiler world is better difficult but for simpler use cases like ours, it was set with Open Source tools such as Antr.

## Resources

[I wrote a programming language. Here’s how you can, too.](https://www.freecodecamp.org/news/the-programming-language-pipeline-91d3f449c919/ "‌")

[Complete Guide to Domain-Specific Languages](https://tomassetti.me/domain-specific-languages/ "‌")

