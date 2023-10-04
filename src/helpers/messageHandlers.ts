/**
 * Consists several handlers for specific
 * message types
 *
 */
import { toast } from "react-hot-toast";

import NotifyToast from "@/components/toasts/notify";

type ErrorParams = {
  message: string;
};

const errorMessageHandler = ({ message }: ErrorParams) => {
  toast.custom(
    NotifyToast({
      message,
      ErrorIcon: true,
    })
  );
};
