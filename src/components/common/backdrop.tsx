/**
 * Backdrop background div
 *
 */

import React, { useRef } from "react";

import useClickOutside from "@/helpers/useOutClick";

type BackdropProps = {
  children?: React.ReactNode;
};

export default function Backdrop({ children }: BackdropProps) {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={divRef}
      className="w-screen h-screen backdrop-blur-[1.8px] fixed z-50 flex justify-center items-center p-4 "
    >
      <div className="w-100 h-100 relative -top-10"> {children} </div>
    </div>
  );
}
