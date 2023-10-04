/**
 * Infnity Toast
 *
 */

import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

type Params = {
  onSetToast: React.Dispatch<string>;
  message: string;
  id: string;
  enabler: boolean;
};

export default function InfinityToast({
  onSetToast,
  message,
  id,
  enabler,
}: Params) {

    useEffect(() => {
    if (enabler) {
      const toastId = toast.loading(message, { id });
      onSetToast(toastId);
    }
  }, [enabler]);

  return null;
}
