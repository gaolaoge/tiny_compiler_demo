import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Popover 组件
 *
 * 用于显示悬停提示信息，替换原生的 title 属性
 * 支持多行文本显示和自定义样式
 *
 * @param {Object} props
 * @param {ReactNode} props.children - 触发 Popover 的元素
 * @param {string} props.content - Popover 显示的内容（支持多行，使用 \n 分隔）
 * @param {string} [props.placement] - Popover 的位置：top, bottom, left, right（默认：top）
 * @param {number} [props.delay] - 显示延迟（毫秒，默认：200）
 */
export const Popover = ({
  children,
  content,
  placement = "top",
  delay = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef(null);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  // 计算 Popover 位置
  const updatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + 8;
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        break;
      case "left":
        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.left - popoverRect.width - 8;
        break;
      case "right":
        top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
        left = triggerRect.right + 8;
        break;
      default:
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
    }

    // 确保 Popover 不会超出视口（使用 fixed 定位，相对于视口）
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 8) left = 8;
    if (left + popoverRect.width > viewportWidth - 8) {
      left = viewportWidth - popoverRect.width - 8;
    }

    if (top < 8) top = 8;
    if (top + popoverRect.height > viewportHeight - 8) {
      top = viewportHeight - popoverRect.height - 8;
    }

    setPosition({ top, left });
  };

  // 显示 Popover
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // 延迟一帧更新位置，确保 DOM 已渲染
      requestAnimationFrame(() => {
        updatePosition();
      });
    }, delay);
  };

  // 隐藏 Popover
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // 当内容变化时更新位置
  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible, content]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 如果没有内容，直接返回 children
  if (!content) {
    return children;
  }

  // 将多行文本转换为 JSX
  const renderContent = () => {
    if (typeof content === "string") {
      return content
        .split("\n")
        .map((line, index) => <div key={index}>{line || "\u00A0"}</div>);
    }
    return content;
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: "inline-block" }}
      >
        {children}
      </span>
      {isVisible &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
              backgroundColor: "#1f2937",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              lineHeight: "1.5",
              zIndex: 10000,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              pointerEvents: "none",
              whiteSpace: "pre-wrap",
              maxWidth: "300px",
              wordWrap: "break-word",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {renderContent()}
            {/* 箭头指示器 */}
            <div
              style={{
                position: "absolute",
                width: 0,
                height: 0,
                borderStyle: "solid",
                ...(placement === "top" && {
                  bottom: "-6px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderWidth: "6px 6px 0 6px",
                  borderColor: "#1f2937 transparent transparent transparent",
                }),
                ...(placement === "bottom" && {
                  top: "-6px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderWidth: "0 6px 6px 6px",
                  borderColor: "transparent transparent #1f2937 transparent",
                }),
                ...(placement === "left" && {
                  right: "-6px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  borderWidth: "6px 0 6px 6px",
                  borderColor: "transparent transparent transparent #1f2937",
                }),
                ...(placement === "right" && {
                  left: "-6px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  borderWidth: "6px 6px 6px 0",
                  borderColor: "transparent #1f2937 transparent transparent",
                }),
              }}
            />
          </div>,
          document.body
        )}
    </>
  );
};
