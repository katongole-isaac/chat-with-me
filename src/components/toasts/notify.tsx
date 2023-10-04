/**
 * Notify toast
 *
 */

import React from "react";
import { toast } from "react-hot-toast";
import { MdError, MdClose } from "react-icons/md";
import { JsxElement } from "typescript";

type ToastProps = {
  Icon?: React.ComponentType ;
  ErrorIcon?: boolean;
  message?: string;
  classes?: string;
  toastId?: string;
  closeBtn?: boolean
};

const NotifyToast = ({
  message,
  Icon,
  ErrorIcon,
  classes,
  toastId,
  closeBtn = true
}: ToastProps) => {
  const handleClose = (tId: string) => {
    toast.remove(tId);
  };

  return (
    <div
      className={` rounded-md min-w-[220px] w-max max-w-[350px] text-slate-300 font-medium py-2 px-3  text-[14px] bg-slate-800 flex items-center gap-2 ${classes}`}
    >
      <div className="flex flex-1 gap-2 items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          {Icon && <Icon />}
          {ErrorIcon && <MdError size={18} />}
          <span> {message} </span>
        </div>
      </div>
      {
closeBtn &&
      <div className="basis-4">
        <MdClose
          size={18}
          onClick={() => handleClose(toastId as string)}
          className="cursor-pointer "
        />
      </div>
      }
    </div>
  );
};

export default NotifyToast;
