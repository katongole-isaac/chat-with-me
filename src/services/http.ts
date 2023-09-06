/**
 * This module provides methods used
 * in data fetching to external APIs
 *
 */

import axios from "axios";
import config from "@/config/defaults.json";
import { getCurrentUser } from "@/helpers/user";

// you can set the defaults

axios.defaults.baseURL = config.serverBaseURL;

// set x-auth-token header
function setAuthHeader() {
  const user = getCurrentUser();
  if (user) {
    const { accessToken } = user.stsTokenManager;
    axios.defaults.headers.common["x-auth-token"] = accessToken;
  }
}

setAuthHeader();

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
};
