/**
 * Slate.js 富文本编辑器组件
 *
 * Slate.js 是一个完全可定制的富文本编辑框架，它使用 React 来构建编辑器。
 * 核心思想是将文档表示为嵌套的数据结构（类似虚拟 DOM），而不是直接操作 DOM。
 */

import { useState, useCallback } from "react";
// createEditor: 创建编辑器实例的核心函数
import { createEditor } from "slate";
// Slate: 提供编辑器上下文（Context）的组件，类似于 React Context Provider
// Editable: 可编辑区域的组件，这是用户实际输入和交互的地方
// withReact: 为编辑器添加 React 支持的高阶函数
import { Slate, Editable, withReact } from "slate-react";
// 导入元素样式配置
import { elementStyles } from "./elementStyles";
// 导入元素类型枚举和变量值类型枚举
import { ElementType, VariableValueType } from "../types";
// 导入 Popover 组件
import { Popover } from "./Popover";

/**
 * 初始文档值示例
 * 展示 5 种数据类型的使用方式，包括不同类型的变量
 */
const initialValue = [
  {
    type: ElementType.PARAGRAPH,
    children: [{ text: "变量类型示例：" }],
  },
  // 字符串类型变量
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
  {
    type: ElementType.PARAGRAPH,
    children: [{ text: "" }], // 换行
  },
  // 数字类型变量
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
  {
    type: ElementType.PARAGRAPH,
    children: [{ text: "" }], // 换行
  },
  // 单值记录类型变量
  {
    type: ElementType.VARIABLE,
    children: [{ text: "user" }],
    valueType: VariableValueType.SINGLE_RECORD,
    schema: "UserSchema",
  },
  {
    type: ElementType.PARAGRAPH,
    children: [{ text: "" }], // 换行
  },
  // 多值记录类型变量
  {
    type: ElementType.VARIABLE,
    children: [{ text: "users" }],
    valueType: VariableValueType.MULTI_RECORD,
    schema: "UserSchema",
  },
  {
    type: ElementType.PARAGRAPH,
    children: [{ text: "" }], // 换行
  },
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
];

export const SlateEditor = () => {
  /**
   * 创建编辑器实例
   *
   * useState(() => ...) 使用函数初始化，确保编辑器实例只创建一次
   * createEditor() 创建基础的编辑器实例
   * withReact() 为编辑器添加 React 支持，使其能够与 React 组件协同工作
   *
   * 编辑器实例包含了所有的编辑逻辑和状态管理
   */
  const [editor] = useState(() => withReact(createEditor()));

  const [value, setValue] = useState(initialValue);

  /**
   * 渲染元素（Element）的函数
   *
   * 在 Slate.js 中，文档由两种类型的节点组成：
   * 1. Element（元素节点）：如段落、标题、列表等，有 type 属性
   * 2. Text（文本节点）：包含实际文本内容，有 text 属性
   *
   * renderElement 负责渲染所有的 Element 节点
   *
   * @param {Object} props - 渲染参数
   * @param {Object} props.attributes - DOM 属性，必须传递给最外层的 DOM 元素
   *                                    Slate 使用这些属性来管理选择、光标等
   * @param {ReactNode} props.children - 子节点的渲染结果
   * @param {Object} props.element - 当前要渲染的元素节点对象
   * @param {string} props.element.type - 元素类型（如 "paragraph", "heading"）
   *
   * 返回值：返回一个 React 元素，用于渲染该 Element
   */
  const renderElement = useCallback(({ attributes, children, element }) => {
    // 根据元素类型决定如何渲染
    // 样式配置从 elementStyles 对象中读取，保持代码整洁
    // 支持 5 种数据类型：变量、数字、字符串、函数调用、字符
    switch (element.type) {
      case ElementType.PARAGRAPH:
      case "paragraph": {
        // 段落渲染为 <span> 标签（容器类型）
        const config = elementStyles.paragraph;
        return (
          <span {...attributes} style={config?.style}>
            {children}
          </span>
        );
      }

      case ElementType.VARIABLE:
      case "variable": {
        // 变量渲染为带样式的 <span> 标签
        const config = elementStyles.variable;
        const hoverText = config?.getHoverText?.(element);

        return (
          <Popover content={hoverText} placement="top">
            <span {...attributes} style={config?.style}>
              {children}
            </span>
          </Popover>
        );
      }

      case ElementType.NUMBER:
      case "number": {
        // 数字渲染为带样式的 <span> 标签
        const config = elementStyles.number;
        const hoverText = config?.getHoverText?.(element);

        return (
          <Popover content={hoverText} placement="top">
            <span {...attributes} style={config?.style}>
              {children}
            </span>
          </Popover>
        );
      }

      case ElementType.STRING:
      case "string": {
        // 字符串渲染为带样式的 <span> 标签
        const config = elementStyles.string;
        const hoverText = config?.getHoverText?.(element);

        return (
          <Popover content={hoverText} placement="top">
            <span {...attributes} style={config?.style}>
              {children}
            </span>
          </Popover>
        );
      }

      case ElementType.FUNCTION_CALL:
      case "functionCall": {
        // 函数调用渲染为带样式的 <span> 标签
        // 注意：函数名应该在 children 的第一个位置作为文本节点
        // 或者通过 element.name 属性获取（如果存在）
        const config = elementStyles.functionCall;
        const hoverText = config?.getHoverText?.(element);

        // 如果 element.name 存在，显示函数名，否则使用 children 中的内容
        return (
          <Popover content={hoverText} placement="top">
            <span {...attributes} style={config?.style}>
              {element.name ? (
                <>
                  <span style={{ fontWeight: 600 }}>{element.name}</span>
                  <span>(</span>
                  {children}
                  <span>)</span>
                </>
              ) : (
                children
              )}
            </span>
          </Popover>
        );
      }

      case ElementType.CHARACTER:
      case "character": {
        // 字符渲染为带样式的 <span> 标签
        const config = elementStyles.character;
        const hoverText = config?.getHoverText?.(element);

        return (
          <Popover content={hoverText} placement="top">
            <span {...attributes} style={config?.style}>
              {children}
            </span>
          </Popover>
        );
      }

      default: {
        // 默认也渲染为段落
        const config = elementStyles.paragraph;
        return (
          <span {...attributes} style={config?.style}>
            {children}
          </span>
        );
      }
    }
  }, []);

  /**
   * 渲染叶子节点（Leaf）的函数
   *
   * Leaf 是包含文本格式信息的节点，位于 Element 的最底层
   * 例如：一段文本中，某些文字可能是粗体、斜体等
   *
   * renderLeaf 负责渲染文本的格式化（如粗体、斜体、下划线等）
   *
   * @param {Object} props - 渲染参数
   * @param {Object} props.attributes - DOM 属性，必须传递给最外层的 DOM 元素
   * @param {ReactNode} props.children - 文本内容
   * @param {Object} props.leaf - 当前文本节点的格式信息
   * @param {boolean} props.leaf.bold - 是否为粗体
   * @param {boolean} props.leaf.italic - 是否为斜体
   * @param {boolean} props.leaf.underline - 是否有下划线
   *
   * 返回值：返回一个 <span> 元素，包含格式化后的文本
   */
  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    // 从基础的 children 开始
    let element = children;

    // 根据 leaf 的格式属性，逐层包装文本
    // 注意：这些格式可以叠加，比如同时是粗体和斜体

    if (leaf.bold) {
      // 如果是粗体，用 <strong> 标签包装
      element = <strong>{element}</strong>;
    }

    if (leaf.italic) {
      // 如果是斜体，用 <em> 标签包装
      element = <em>{element}</em>;
    }

    if (leaf.underline) {
      // 如果有下划线，用 <u> 标签包装
      element = <u>{element}</u>;
    }

    // 最后必须返回一个带有 attributes 的 <span> 元素
    // attributes 包含 Slate 需要的 DOM 属性，用于管理编辑状态
    return <span {...attributes}>{element}</span>;
  }, []);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        minHeight: "200px",
        marginTop: "20px",
      }}
    >
      {/**
       * Slate 组件
       *
       * 这是 Slate.js 的上下文提供者，类似于 React Context Provider
       * 它向所有子组件提供编辑器实例和文档状态
       *
       * @param {Object} editor - 编辑器实例（通过 createEditor 创建）
       * @param {Array} initialValue - 初始文档值（树形结构）
       *
       * Slate 组件内部会管理文档的状态，当用户编辑时，状态会自动更新
       */}
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        {/**
         * Editable 组件
         *
         * 这是实际的可编辑区域，用户在这里输入和编辑内容
         * 它渲染整个文档树，并处理所有的用户交互（输入、选择、删除等）
         *
         * @param {Function} renderElement - 渲染 Element 节点的函数
         * @param {Function} renderLeaf - 渲染文本节点的函数
         * @param {string} placeholder - 占位符文本（当编辑器为空时显示）
         *
         * Editable 会：
         * 1. 遍历文档树
         * 2. 对每个 Element 调用 renderElement
         * 3. 对每个 Text 节点调用 renderLeaf
         * 4. 处理用户的输入事件，更新文档状态
         */}
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={"请输入内容"}
        />
      </Slate>
    </div>
  );
};
