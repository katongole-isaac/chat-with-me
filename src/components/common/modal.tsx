/**
 *  Informative modal
 *
 */

import React from "react";

interface ModalProps {
  title: string;
  description: string;
  onCancel: () => void;
  onContinue: () => void;
}

const Modal = ({ title, description, onCancel, onContinue }: ModalProps) => {
  return (
    // <Backdrop>
    <div className="w-full h-full absolute backdrop-filter backdrop-brightness-50 z-50 flex justify-center items-center p-4 ">
      <div className="bg-[#fafafa] max-w-[500px] m-auto min-h-[150px] rounded-md flex flex-col py-6 px-4">
        <div className="flex flex-col gap-1 pb-6 flex-1">
          <p className="font-semibold">{title}</p>
          <span className="text-gray-400 text-[14px]">{description}</span>
        </div>

        <div className="self-end flex gap-4 font-semibold ">
          <button
            className="text-sky-600 font-semibold"
            onClick={(e) => onCancel()}
          >
            Cancel
          </button>
          <button className="text-rose-600 " onClick={() => onContinue()}>
            Yes
          </button>
        </div>
      </div>
    </div>
    // </Backdrop>
  );
};

export default Modal;
