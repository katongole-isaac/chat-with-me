/**
 * This hook is used to close modal or dropdowns when clicked outside their divs or container
 *
 */

import React, { useEffect, RefObject, SetStateAction } from "react";

/**
 * Close modal when clicked outside
 *
 */

type Params<T> = {
  showModal: boolean;
  onSetShowModal: React.Dispatch<SetStateAction<boolean>>;
  originRef: RefObject<T> | null;
  popupRef: RefObject<T> | null;
};

const useClickOutside = <T extends HTMLElement>({
  onSetShowModal,
  showModal,
  originRef,
  popupRef,
}: Params<T>) => {
  const checkClick = (e: any) => {
    // if u click outside the div
    // and not inisde the input

    if (
      !popupRef?.current?.contains(e.target) &&
      !originRef?.current?.contains(e.target)
    )
      onSetShowModal(false);
  };

  const onEscapeKey = (e: KeyboardEvent) => {
    if (e.code === "Escape") onSetShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.addEventListener("click", checkClick);
      document.body.addEventListener("keydown", onEscapeKey);
    }

    return () => {
      document.body.removeEventListener("click", checkClick);
      document.body.removeEventListener("keydown", onEscapeKey);
    };
  }, [showModal]);
};

export default useClickOutside;
