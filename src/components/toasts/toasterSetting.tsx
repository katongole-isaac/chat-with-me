/**
 * Toast setting
 *
 */

import { Toaster } from "react-hot-toast";

export default function DefaultToaster() {
  return <Toaster position="bottom-left" gutter={8} />;
}
