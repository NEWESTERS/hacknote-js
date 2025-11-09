import { type FC, useId, useState } from "react";
import clsx from "clsx";

import { BaseLink, type BaseLinkProps } from "../BaseLink";
import { LinkPreview, type LinkPreviewProps } from "../LinkPreview";
import { Popover } from "../Popover";
import Styles from "./LinkWithPreview.module.css";

export interface LinkWithPreviewProps
  extends Omit<BaseLinkProps, "title">,
    Pick<LinkPreviewProps, "title" | "description" | "thumbnailUrl"> {}

function createAnchorName(id: string): string {
  return `--anchor-${id.replaceAll(/[:=]/g, "")}`;
}

export const LinkWithPreview: FC<LinkWithPreviewProps> = ({
  className,
  style,
  href,
  title,
  description,
  thumbnailUrl,
  ...props
}) => {
  const id = useId();

  const anchorName = createAnchorName(id);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseLink
        {...props}
        className={clsx(Styles.LinkWithPreview, className)}
        style={{ ...style, anchorName }}
        href={href}
        onPointerEnter={() => setIsOpen(true)}
        onPointerLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        aria-describedby={isOpen ? id : undefined}
      />

      <Popover isOpen={isOpen} positionAnchor={anchorName}>
        <LinkPreview
          id={id}
          title={title}
          description={description}
          sourceUrl={href}
          thumbnailUrl={thumbnailUrl}
        />
      </Popover>
    </>
  );
};
