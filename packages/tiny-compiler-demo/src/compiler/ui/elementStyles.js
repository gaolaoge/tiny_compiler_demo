/**
 * Slate.js 元素样式配置
 *
 * 将不同元素类型的样式统一管理，便于维护和修改
 * 每个元素类型可以包含：
 * - style: React 样式对象
 * - getHoverText: 获取 hover 提示文本的函数
 * - 其他自定义配置
 */

const defaultStyle = {
  display: "inline-block",
  padding: "0 4px",
};

/**
 * 元素样式配置对象
 * 对应 5 种数据类型：变量、数字、字符串、函数调用、字符
 */
export const elementStyles = {
  /**
   * 段落样式（容器类型）
   */
  paragraph: {
    style: { ...defaultStyle },
  },

  /**
   * 变量样式
   * 用于表示变量名，如：userName, count 等
   */
  variable: {
    style: {
      ...defaultStyle,
      color: "#667eea", // 紫色文字
      fontFamily: "monospace", // 等宽字体
      fontWeight: 500, // 中等粗细
      cursor: "pointer",
    },
    /**
     * 获取 hover 提示文本的函数
     * @param {Object} element - 元素节点对象
     * @returns {string} hover 提示文本
     */
    getHoverText: (element) => {
      // 如果提供了自定义 hover 文本，优先使用
      if (element.hoverText || element.description || element.tooltip) {
        return element.hoverText || element.description || element.tooltip;
      }

      // 构建变量信息
      const variableName = element.children?.[0]?.text || "";
      const valueType = element.valueType || "unknown";
      const schema = element.schema;

      // 根据值类型构建提示文本
      let typeLabel = "";
      switch (valueType) {
        case "string":
          typeLabel = "字符串";
          break;
        case "number":
          typeLabel = "数字";
          break;
        case "boolean":
          typeLabel = "布尔";
          break;
        case "singleRecord":
          typeLabel = "单值记录";
          break;
        case "multiRecord":
          typeLabel = "多值记录";
          break;
        default:
          typeLabel = "未知类型";
      }

      // 构建完整的提示文本
      let hoverText = `变量: ${variableName}\n类型: ${typeLabel}`;

      // 如果是记录类型，添加 schema 信息
      if (
        (valueType === "singleRecord" || valueType === "multiRecord") &&
        schema
      ) {
        hoverText += `\nSchema: ${schema}`;
      }

      return hoverText;
    },
  },

  /**
   * 数字样式
   * 用于表示数字字面量，如：42, 3.14, -10 等
   */
  number: {
    style: {
      ...defaultStyle,
      color: "#10b981", // 绿色文字
      fontFamily: "monospace", // 等宽字体
      fontWeight: 500,
    },
    /**
     * 获取 hover 提示文本的函数
     * @param {Object} element - 元素节点对象
     * @returns {string} hover 提示文本
     */
    getHoverText: (element) => {
      const value = element.value ?? element.children?.[0]?.text;
      return `数字: ${value}`;
    },
  },

  /**
   * 字符串样式
   * 用于表示字符串字面量，如："Hello", 'World' 等
   */
  string: {
    style: {
      ...defaultStyle,
      color: "#f59e0b", // 橙色文字
      fontFamily: "monospace", // 等宽字体
      fontStyle: "italic", // 斜体
    },
    /**
     * 获取 hover 提示文本的函数
     * @param {Object} element - 元素节点对象
     * @returns {string} hover 提示文本
     */
    getHoverText: (element) => {
      const value = element.value ?? element.children?.[0]?.text;
      return `字符串: ${value}`;
    },
  },

  /**
   * 函数调用样式
   * 用于表示函数调用，如：add(2, 3), sum(a, b) 等
   */
  functionCall: {
    style: {
      ...defaultStyle,
      color: "#8b5cf6", // 紫色文字
      fontFamily: "monospace", // 等宽字体
      fontWeight: 600, // 加粗
    },
    /**
     * 获取 hover 提示文本的函数
     * @param {Object} element - 元素节点对象
     * @returns {string} hover 提示文本
     */
    getHoverText: (element) => {
      return (
        element.hoverText ||
        element.description ||
        `函数: ${element.name || "未知函数"}`
      );
    },
  },

  /**
   * 字符样式
   * 用于表示单个字符或操作符，如：+, -, *, /, = 等
   */
  character: {
    style: {
      ...defaultStyle,
      color: "#6b7280", // 灰色文字
      fontFamily: "monospace", // 等宽字体
      fontWeight: 600, // 加粗
    },
    /**
     * 获取 hover 提示文本的函数
     * @param {Object} element - 元素节点对象
     * @returns {string} hover 提示文本
     */
    getHoverText: (element) => {
      const char = element.children?.[0]?.text || "";
      return `字符: ${char}`;
    },
  },
};
