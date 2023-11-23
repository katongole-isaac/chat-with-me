import { useState, useEffect } from "react";

export function useShowHideModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleKeyPress = (e: KeyboardEvent): void => {
    if (showModal && e.code === "Escape") setShowModal(false);
  };

  return {
    showModal,
    setShowModal,
  };
}
