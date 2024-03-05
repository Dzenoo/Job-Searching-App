import React, { useRef, useState } from "react";
import { TooltipProps } from "./types";

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  const getPositionStyles = () => {
    switch (position) {
      case "bottom":
        return "bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2";
      case "left":
        return "top-1/2 right-full transform translate-x-full -translate-y-1/2";
      case "right":
        return "top-1/2 left-full transform -translate-x-full -translate-y-1/2";
      default:
        return "top-full left-1/2 transform -translate-x-1/2 -translate-y-full";
    }
  };

  return (
    <div className="relative inline-block">
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`w-auto bg-black text-white text-center rounded py-1 absolute z-10 ${getPositionStyles()} opacity-0 pointer-events-none whitespace-nowrap transition ease-in-out duration-300`}
          role="tooltip"
          aria-hidden={!isVisible}
        >
          {text}
          <div className="arrow"></div>
        </div>
      )}
      <div
        className="inline-block cursor-pointer"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>
    </div>
  );
};

export { Tooltip };
