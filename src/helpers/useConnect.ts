/**
 * Used to connect to websocket
 *
 */
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

import config from "@/config/defaults.json";
import NotifyToast from "@/components/toasts/notify";
import { getCurrentUser, logout } from "./user";
import { firebaseAuth } from "@/lib/firebaseApp";

type ConnectParams = {
  onWss: Function;
  wss: WebSocket | null;
};

const useConnect = ({ wss, onWss, }: ConnectParams) => {
  

 const user  = getCurrentUser();

 const {accessToken: _token} = user.stsTokenManager;

  // connect func - is used in the onclose websocket handler
  // to reconnect to the server
  const connect = () => {

    // if we have the token and the websocket is closed or null
    // try to connect
    if (!((wss === null || (wss && wss.readyState === WebSocket.CLOSED)) && _token))
      return;

    onWss(new WebSocket(`${config.websocketUrl}/?token=${_token}`, ["json"]));


  };

  useEffect(() => {

    if (!wss && _token) connect();

  }, [_token, wss]);

  return { connect };
};

export default useConnect;

