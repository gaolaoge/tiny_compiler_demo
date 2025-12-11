import { memo } from "react";

import { tokenizer } from "./core/token";
import { parser } from "./core/parser";
import { semanticAnalyzer } from "./core/semantic";
import { generator } from "./core/generator";
import { SlateEditor } from "./ui";

export const Compiler = memo(({ input }) => {
  console.log("input: ", input);
  const tokens = tokenizer(input);
  console.log("tokens: ", tokens);
  const ast = parser(tokens);
  console.log("ast: ", ast);
  let code = generator(ast);
  console.log("code: ", code);
  code = semanticAnalyzer(code);
  console.log("code: ", code);
  console.log("--------------------------------");

  return <SlateEditor input={input} />;
});
Compiler.displayName = "Compiler";

/**
 * TODO
 * 1. 支持外部导入 函数（规则 + 校验）
 * 2. 校验 + 报错
 * 3. 支持外部导入 变量
 * 4. 支持输入联想
 */
