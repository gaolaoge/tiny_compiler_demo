function parser(tokens) {
  let current = 0;

  function walk() {
    const token = tokens[current];

    if (token.type === "number") {
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    if (token.type === "string") {
      return {
        type: "StringLiteral",
        value: token.value,
      };
    }

    // if (token.type === "plus") {
    //   return {
    //     type: "AddExpression",
    //     left: walk(),
    //     right: walk(),
    //   };
    // }

    // if (token.type === "minus") {
    //   return {
    //     type: "SubtractExpression",
    //     left: walk(),
    //     right: walk(),
    //   };
    // }

    throw new TypeError(token.type);
  }

  const ast = {
    type: "Program",
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
    current++;
  }

  return ast;
}
export { parser };
