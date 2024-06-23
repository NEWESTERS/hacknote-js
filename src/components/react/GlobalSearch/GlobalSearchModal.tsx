import { useState, type ReactElement } from "react";

import { useKeyboardShortcut } from "@utils/react";
import { ModalDialog } from "../ModalDialog";
import { PagefindSearchField } from "../PagefindSearchField";
import { GlobalSearchTrigger } from "../GlobalSearchTrigger";
import Styles from "./GlobalSearchModal.module.css";

export interface GlobalSearchModalProps {
  className?: string;
}

export const GlobalSearchModal = ({
  className,
}: GlobalSearchModalProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => setIsOpen(false);

  useKeyboardShortcut({
    onPress: openModal,
    predicate: (event) => event.key === "/",
  });

  return (
    <>
      <GlobalSearchTrigger
        className={className}
        title="Поиск"
        onClick={(event) => {
          event.stopPropagation();
          openModal();
        }}
      />

      {isOpen && (
        <ModalDialog
          open={true}
          className={Styles.Modal}
          onClickOutside={closeModal}
          onClose={closeModal}
        >
          <PagefindSearchField
            className={Styles.Search}
            onLinkClick={closeModal}
          />
        </ModalDialog>
      )}
    </>
  );
};
