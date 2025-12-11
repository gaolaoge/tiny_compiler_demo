## Tiny Compiler 简述

**Tiny Compiler** 是一个教学用的简化编译器，用于演示编译器的核心流程。

### 核心流程（三个阶段）

```
源代码 → [词法分析] → Token流 → [语法分析] → AST → [代码生成] → 目标代码
```

1. **词法分析（Lexical Analysis / Tokenization）**

   - 将源代码字符串拆分为 Token（标识符、关键字、运算符等）
   - 例如：`add(2, 3)` → `['add', '(', '2', ',', '3', ')']`

2. **语法分析（Parsing / Syntax Analysis）**

   - 将 Token 流转换为抽象语法树（AST）
   - 例如：`CallExpression(name: 'add', args: [2, 3])`

3. **代码生成（Code Generation）**
   - 遍历 AST，生成目标代码（JavaScript、机器码等）

### 典型实现示例

一个简单的数学表达式编译器：

```javascript
// 输入: "add(2, subtract(4, 2))"
// 输出: "add(2, subtract(4, 2))" // JavaScript 代码

// 或者输出: "2 + (4 - 2)" // 另一种形式
```

### 常见应用场景

- **公式计算器**：解析数学表达式并计算
- **模板引擎**：将模板语法转换为 HTML
- **DSL（领域特定语言）**：自定义语法规则
- **代码转换工具**：Babel、TypeScript 等的基础

### 在你的项目中

`tiny-compiler-demo` 可以是一个：

- **公式解析器**：解析用户输入的数学公式
- **表达式计算器**：计算复杂表达式
- **代码转换工具**：将自定义语法转换为 JavaScript
