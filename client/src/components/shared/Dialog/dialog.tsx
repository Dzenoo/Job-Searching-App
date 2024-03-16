import React, { useEffect, useRef, useState } from "react";
import { DialogProps } from "./types";
import { Card, CardContent, CardHeader } from "../Card";
import { X } from "lucide-react";
import useOnOutsideClick from "@/hooks/useOnOutsideClick";

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  className,
  showCloseButton,
  render,
  onCloseDialog,
}) => {
  const $dialogRef = useRef(null);
  const $overlayRef = useRef(null);

  const closeDialog = React.useCallback(() => {
    onCloseDialog();
  }, []);

  useOnOutsideClick([$dialogRef], isOpen, closeDialog);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "visible";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          ref={$overlayRef}
          className={`bg-opacity-overlay content-[''] fixed top-0 left-0 right-0 bottom-0 z-30 flex justify-center items-center transition-all backdrop-blur-lg`}
          onClick={closeDialog}
        >
          <Card
            className={className}
            ref={$dialogRef}
            onClick={(e) => e.stopPropagation()}
          >
            {showCloseButton && (
              <CardHeader className="absolute right-3 top-3">
                <button onClick={closeDialog}>
                  <X />
                </button>
              </CardHeader>
            )}
            <CardContent>{render({ exit: closeDialog })}</CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export { Dialog };
