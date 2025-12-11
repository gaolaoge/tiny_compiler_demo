export const CalculationSymbol = {
  Plus: "plus",
  Minus: "minus",
};

export const CalculationType = {
  AddExpression: "AddExpression",
  SubtractExpression: "SubtractExpression",
};

export const CalculationTypeMap = {
  [CalculationSymbol.Plus]: CalculationType.AddExpression,
  [CalculationSymbol.Minus]: CalculationType.SubtractExpression,
};
