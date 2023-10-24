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
      className="w-screen h-screen backdrop-filter backdrop-brightness-50 fixed z-[100] flex justify-center items-center p-4 "
    >
      {children}
    </div>
  );
}
