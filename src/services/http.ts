/**
 * This module provides methods used
 * in data fetching to external APIs
 *
 */

import axios from "axios";
import config from "@/config/defaults.json";
import { getCurrentUser } from "@/helpers/user";
import { toast } from "react-hot-toast";
import { AiOutlineWifi } from 'react-icons/ai'
import NotifyToast from "@/components/toasts/notify";


// you can set the defaults

axios.defaults.baseURL = config.serverBaseURL;

axios.interceptors.response.use(null, (error) => {

  // if error has no response
 // means we lost connectivity
  if (! error.hasOwnProperty("response") )
    toast.custom((t) =>
      NotifyToast({
        message: "Connectivity lost",
        Icon: AiOutlineWifi,
        toastId: t.id,
      })
    );

  return Promise.reject(error);
});

function setAuthHeader() {
  const user = getCurrentUser();
  if (user) {
    const { accessToken } = user.stsTokenManager;
    axios.defaults.headers.common["x-auth-token"] = accessToken;
  }
}

//  setAuthHeader();

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
};
