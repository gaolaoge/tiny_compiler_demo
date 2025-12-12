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

/**
 * Slate.js 数据模型规范
 *
 * 定义了公式编辑器中支持的 5 种数据类型：
 * 1. variable - 变量
 * 2. number - 数字
 * 3. string - 字符串
 * 4. functionCall - 函数调用
 * 5. character - 字符
 */

/**
 * 元素类型枚举
 */
export const ElementType = {
  VARIABLE: "variable",
  NUMBER: "number",
  STRING: "string",
  BOOLEAN: "boolean",
  FUNCTION_CALL: "functionCall",
  CHARACTER: "character",
  PARAGRAPH: "paragraph", // 段落（容器类型）
};

/**
 * 变量值类型枚举
 * 定义变量可以存储的数据类型
 */
export const VariableValueType = {
  STRING: "string", // 字符串类型
  NUMBER: "number", // 数字类型
  BOOLEAN: "boolean", // 布尔类型
  SINGLE_RECORD: "singleRecord", // 单值记录（一条记录）
  MULTI_RECORD: "multiRecord", // 多值记录（多条记录）
};
