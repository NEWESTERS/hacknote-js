import clsx from "clsx";
import { useState, type CSSProperties, type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";

import Styles from "./Popover.module.css";

export interface PopoverProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  isOpen: boolean;
  positionAnchor: string;
}

const POPOVER_ROOT_ID = "popover-root";

function getPopoverRoot(): Element | undefined {
  if (typeof document === "undefined") return;

  let portalRoot = document.getElementById(POPOVER_ROOT_ID);

  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.id = POPOVER_ROOT_ID;
    document.body.appendChild(portalRoot);
  }

  return portalRoot;
}

export const Popover: FC<PopoverProps> = ({
  className,
  style,
  isOpen,
  children,
  positionAnchor,
}) => {
  const [portalRoot] = useState<Element | undefined>(getPopoverRoot);

  return (
    <>
      {portalRoot &&
        isOpen &&
        createPortal(
          <div
            className={clsx(Styles.Popover, className)}
            style={{
              ...style,
              positionAnchor,
            }}
          >
            {children}
          </div>,
          portalRoot
        )}
    </>
  );
};
