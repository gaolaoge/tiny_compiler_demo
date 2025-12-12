import { memo } from "react";

import { tokenizer } from "./core/token";
import { parser } from "./core/parser";
import { semanticAnalyzer } from "./core/semantic";
import { generator } from "./core/generator";
import { SlateEditor } from "./ui";

export const Compiler = memo(({ input }) => {
  console.log("Compiler input: ", input);
  const tokens = tokenizer(input);
  console.log("Compiler tokens: ", tokens);
  const ast = parser(tokens);
  console.log("Compiler ast: ", ast);
  const code = generator(ast);
  console.log("Compiler code: ", code);
  const dsl = semanticAnalyzer(code);
  console.log("Compiler dsl: ", dsl);
  console.log("Compiler --------------------------------");

  return <SlateEditor ast={ast} />;
});
Compiler.displayName = "Compiler";

/**
 * TODO
 * 1. 支持外部导入 函数（规则 + 校验）
 * 2. 校验 + 报错
 * 3. 支持外部导入 变量
 * 4. 支持输入联想
 */
