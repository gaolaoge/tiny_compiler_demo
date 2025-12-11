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

/**
 * 数据模型规范定义
 *
 * 每种数据类型必须遵循以下结构：
 *
 * @typedef {Object} BaseElement
 * @property {string} type - 元素类型（ElementType 中的值）
 * @property {Array<Node>} children - 子节点数组（必需，不能为空）
 *
 * @typedef {Object} VariableElement
 * @property {string} type - "variable"
 * @property {Array<TextNode>} children - 包含变量名的文本节点
 * @property {string} [hoverText] - hover 提示文本（可选）
 * @property {string} [description] - 变量描述（可选）
 * @property {string} [tooltip] - 工具提示（可选）
 * @property {string} valueType - 变量值的类型（VariableValueType 中的值）
 *                                 可选值：string, number, boolean, singleRecord, multiRecord
 * @property {string} [schema] - Schema 名称（当 valueType 为 singleRecord 或 multiRecord 时必需）
 *                                表示记录归属于哪个 schema
 *
 * @typedef {Object} NumberElement
 * @property {string} type - "number"
 * @property {Array<TextNode>} children - 包含数字值的文本节点
 * @property {number} [value] - 数字值（可选，用于计算）
 *
 * @typedef {Object} StringElement
 * @property {string} type - "string"
 * @property {Array<TextNode>} children - 包含字符串内容的文本节点
 * @property {string} [value] - 字符串值（可选）
 *
 * @typedef {Object} FunctionCallElement
 * @property {string} type - "functionCall"
 * @property {string} name - 函数名称
 * @property {Array<Element>} children - 函数参数列表（元素数组）
 * @property {string} [hoverText] - hover 提示文本（可选）
 * @property {string} [description] - 函数描述（可选）
 *
 * @typedef {Object} CharacterElement
 * @property {string} type - "character"
 * @property {Array<TextNode>} children - 包含单个字符的文本节点
 *
 * @typedef {Object} TextNode
 * @property {string} text - 文本内容
 * @property {boolean} [bold] - 是否粗体（可选）
 * @property {boolean} [italic] - 是否斜体（可选）
 * @property {boolean} [underline] - 是否有下划线（可选）
 *
 * @typedef {BaseElement|VariableElement|NumberElement|StringElement|FunctionCallElement|CharacterElement} Element
 * @typedef {TextNode} Text
 * @typedef {Element|Text} Node
 */

/**
 * 数据模型示例
 */
export const DataModelExamples = {
  // 变量示例 - 字符串类型
  variableString: {
    type: ElementType.VARIABLE,
    children: [{ text: "userName" }],
    valueType: VariableValueType.STRING,
    hoverText: "用户名称变量",
  },

  // 变量示例 - 数字类型
  variableNumber: {
    type: ElementType.VARIABLE,
    children: [{ text: "age" }],
    valueType: VariableValueType.NUMBER,
    hoverText: "年龄变量",
  },

  // 变量示例 - 布尔类型
  variableBoolean: {
    type: ElementType.VARIABLE,
    children: [{ text: "isActive" }],
    valueType: VariableValueType.BOOLEAN,
    hoverText: "是否激活",
  },

  // 变量示例 - 单值记录
  variableSingleRecord: {
    type: ElementType.VARIABLE,
    children: [{ text: "user" }],
    valueType: VariableValueType.SINGLE_RECORD,
    schema: "UserSchema",
    hoverText: "用户记录",
  },

  // 变量示例 - 多值记录
  variableMultiRecord: {
    type: ElementType.VARIABLE,
    children: [{ text: "users" }],
    valueType: VariableValueType.MULTI_RECORD,
    schema: "UserSchema",
    hoverText: "用户列表",
  },

  // 数字示例
  number: {
    type: ElementType.NUMBER,
    children: [{ text: "42" }],
    value: 42,
  },

  // 字符串示例
  string: {
    type: ElementType.STRING,
    children: [{ text: '"Hello World"' }],
    value: "Hello World",
  },

  // 函数调用示例
  functionCall: {
    type: ElementType.FUNCTION_CALL,
    name: "add",
    children: [
      {
        type: ElementType.NUMBER,
        children: [{ text: "2" }],
      },
      {
        type: ElementType.NUMBER,
        children: [{ text: "3" }],
      },
    ],
    hoverText: "加法函数：计算两个数的和",
  },

  // 字符示例
  character: {
    type: ElementType.CHARACTER,
    children: [{ text: "+" }],
  },
};
