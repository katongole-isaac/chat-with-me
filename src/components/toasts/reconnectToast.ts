/**
 * Infnity Toast
 *
 */

import React from "react";
import { toast } from "react-hot-toast";

export default function InfinityToast({
  onSetToast,
  message,
  id,
}: {
  onSetToast: React.Dispatch<string>;
  message: string;
  id: string;
}) {
  const toastId = toast.loading(message, {
    id,
    className: "bg-slate-800",
  });

  onSetToast(toastId);
  return null;
}
