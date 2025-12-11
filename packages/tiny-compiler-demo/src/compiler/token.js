function tokenizer(input) {
  let current = 0;
  const tokens = [];

  while (current < input.length) {
    let char = input[current];

    if (/\s/.test(char)) {
      current++;
      continue;
    }

    if (char === "+") {
      tokens.push({
        type: "plus",
        value: char,
      });
      current++;
      continue;
    }

    if (char === "-") {
      tokens.push({
        type: "minus",
        value: char,
      });
      current++;
      continue;
    }

    if (char === "*") {
      tokens.push({
        type: "multiply",
        value: char,
      });
      current++;
      continue;
    }

    if (char === "/") {
      tokens.push({
        type: "divide",
        value: char,
      });
      current++;
      continue;
    }

    if (char === "(" || char === ")") {
      tokens.push({
        type: "paren",
        value: char,
      });
      current++;
      continue;
    }

    if (char === ",") {
      tokens.push({
        type: "comma",
        value: char,
      });
      current++;
      continue;
    }

    if (/[0-9]/.test(char)) {
      let value = "";
      while (/[0-9]/.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: "number",
        value,
      });
      continue;
    }

    if (char === '"') {
      let value = "";
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: "string",
        value,
      });
      continue;
    }

    if (/[A-z]/.test(char)) {
      let value = char;
      while (/[A-z]/.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: "name",
        value,
      });
    }

    throw new TypeError(`未知字符： ${char}`);
  }

  return tokens;
}
export { tokenizer };
