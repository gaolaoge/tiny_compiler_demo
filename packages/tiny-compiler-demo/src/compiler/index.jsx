import { tokenizer } from "./core/token";
import { parser } from "./core/parser";
import { semanticAnalyzer } from "./core/semantic";
import { generator } from "./core/generator";
import { RichText } from "./ui";

export const Compiler = (input) => {
  const tokens = tokenizer(input);
  console.log("tokens: ", tokens);
  const ast = parser(tokens);
  console.log("ast: ", ast);
  let code = generator(ast);
  console.log("code: ", code);
  code = semanticAnalyzer(code);
  console.log("code: ", code);

  return <RichText code={code} />;
};
