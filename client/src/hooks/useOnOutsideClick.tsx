import { useEffect, useRef } from "react";

const useOnOutsideClick = (
  $ignoredElementRefs: Array<React.RefObject<HTMLElement>>,
  isListening: boolean,
  onOutsideClick: () => void
) => {
  const $mouseDownTargetRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      $mouseDownTargetRef.current = event.target;
    };

    const handleMouseUp = (event: MouseEvent) => {
      const isAnyIgnoredElementAncestorOfTarget = $ignoredElementRefs.some(
        ($elementRef) =>
          $elementRef.current?.contains($mouseDownTargetRef.current as Node) ||
          $elementRef.current?.contains(event.target as Node)
      );

      if (!isAnyIgnoredElementAncestorOfTarget && event.button === 0) {
        onOutsideClick();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOutsideClick();
      }
    };

    if (isListening) {
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [$ignoredElementRefs, isListening, onOutsideClick]);
};
export default useOnOutsideClick;
