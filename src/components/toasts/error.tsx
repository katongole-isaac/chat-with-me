import React from "react";
import { VscError } from "react-icons/vsc";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-hot-toast";

interface ErrorToastProps {
  toastId?: string;
  message: string;
}
const ErrorToast = ({ toastId, message }: ErrorToastProps) => {
  const iconSize = 25;

  const handleClose = () => {
    if (toastId) toast.dismiss(toastId);
  };

  return (
    <div className=" dark:text-white text-white bg-rose-700 rounded-md shadow-lg border min-w-[280px] max-w-[400px] p-2 flex items-center justify-between gap-2">
      <div className="flex gap-2 items-center">
        <VscError size={iconSize} className="text-white" />
        <p className="text-[14px]">{message} </p>
      </div>

      <div className="flex justify-center hover:bg-neutral-300 hover:rounded-full items-center w-5 h-5">
        <GrFormClose size={iconSize} role="button" onClick={handleClose} />
      </div>
    </div>
  );
};

export default ErrorToast;
