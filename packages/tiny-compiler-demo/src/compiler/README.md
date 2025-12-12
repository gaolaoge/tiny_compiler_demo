# 能力

背景：Compiler 是 1 个公式编辑器，接收用户输入内容，识别为公式后数据持久化，只在服务端执行；
Compiler 能力分层：

0. 类型定义和接口定义：

- 明确 AST 节点规范
- 明确 DSL JSON 规范
- 接入外部 config（变量类型，工具函数）
- 接入需要支持的 外部变量

1. 词法分析阶段 (Tokenizer/Lexer)：

- 负责将源代码分解为 token 序列
- 只做基础的语法单元识别，不进行语义检查

2. 语法分析阶段 (Parser)：

- 构建 AST，检查语法结构是否正确
- 通常不进行深度语义检查
- 语义分析阶段 (Semantic Analyzer) (你缺少的阶段)

3. 检查变量、函数是否声明：

- 类型检查、作用域检查
- 符号表构建和查询
- 透传异常

4. 公式 dsl 生成阶段 (Generator)：

- 将有效的 AST 转换为目标 dsl JSON，与服务端协商 1 致的规范，两端皆可反序列化

5. RichText 公式预览

- 接收 dsl
- 展示异常
- 自定义 格式 + 样式
- 支持 复制 + hover 信息
- 需要「公式渲染库」，如：Slate.js Draft.js Tiptap katex.js

6. 测试：单测 & 集成测试

7. 性能监控

# dsl 协议

```js
const dsl = [
  {
    type: ElementType.PARAGRAPH,
    children: [
      {
        type: ElementType.STRING,
        children: [{ text: "变量类型示例：" }],
        value: "变量类型示例：",
      },
      {
        type: ElementType.VARIABLE,
        children: [{ text: "userName" }],
        valueType: VariableValueType.STRING,
      },
      {
        type: ElementType.CHARACTER,
        children: [{ text: " = " }],
      },
      {
        type: ElementType.STRING,
        children: [{ text: '"John"' }],
        value: "John",
      },
    ],
  },
  {
    type: ElementType.PARAGRAPH,
    children: [
      {
        type: ElementType.VARIABLE,
        children: [{ text: "age" }],
        valueType: VariableValueType.NUMBER,
      },
      {
        type: ElementType.CHARACTER,
        children: [{ text: " = " }],
      },
      {
        type: ElementType.NUMBER,
        children: [{ text: "25" }],
        value: 25,
      },
    ],
  },
  {
    type: ElementType.PARAGRAPH,
    children: [
      // 多值记录类型变量
      {
        type: ElementType.VARIABLE,
        children: [{ text: "users" }],
        valueType: VariableValueType.MULTI_RECORD,
        schema: "UserSchema",
      },
    ],
  },
  {
    type: ElementType.PARAGRAPH,
    children: [
      // 函数调用示例
      {
        type: ElementType.FUNCTION_CALL,
        name: "add",
        children: [
          {
            type: ElementType.NUMBER,
            children: [{ text: "2" }],
            value: 2,
          },
          {
            type: ElementType.CHARACTER,
            children: [{ text: ", " }],
          },
          {
            type: ElementType.NUMBER,
            children: [{ text: "3" }],
            value: 3,
          },
        ],
        hoverText: "加法函数：计算两个数的和",
      },
    ],
  },
];
```
