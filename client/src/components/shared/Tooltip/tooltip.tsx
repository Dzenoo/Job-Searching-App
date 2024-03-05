import React, { useRef, useState } from "react";
import { TooltipProps } from "./types";

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {isVisible && (
        <div
          className={`absolute bg-black text-white text-center rounded py-1 z-10 whitespace-nowrap ${
            position === "top"
              ? "bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2"
              : ""
          } ${
            position === "bottom"
              ? "top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              : ""
          } ${
            position === "left"
              ? "top-1/2 right-full transform translate-x-full -translate-y-1/2"
              : ""
          } ${
            position === "right"
              ? "top-1/2 left-full transform -translate-x-full -translate-y-1/2"
              : ""
          }`}
          style={{
            visibility: isVisible ? "visible" : "hidden",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          {text}
        </div>
      )}
      <div className="inline-block cursor-pointer">{children}</div>
    </div>
  );
};

export { Tooltip };
