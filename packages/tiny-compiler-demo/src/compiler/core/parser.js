import {
  CalculationType,
  CalculationSymbol,
  CalculationTypeMap,
} from "../types";

function parser(tokens) {
  let current = 0;

  const parseExpression = () => {
    let left = parsePrimary();

    if (
      tokens[current] &&
      [CalculationSymbol.Plus, CalculationSymbol.Minus].includes(
        tokens[current].type
      )
    ) {
      const operator = tokens[current++];
      const right = parsePrimary();

      left = {
        type: CalculationTypeMap[operator.type],
        value: operator.value,
        left,
        right,
      };
    }

    return left;
  };

  const parsePrimary = () => {
    const token = tokens[current];

    if (token.type === "number") {
      current++;
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    if (token.type === "string") {
      current++;
      return {
        type: "StringLiteral",
        value: token.value,
      };
    }

    throw new TypeError(token.type);
  };

  const ast = {
    type: "Program",
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(parseExpression());
  }

  return ast;
}
export { parser };
