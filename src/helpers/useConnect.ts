/**
 * Used to connect to websocket
 *
 */

import { useEffect, useState } from "react";

import config from "@/config/defaults.json";
import checkTokenExpiryAndRenew from "./checkTokenExpiry";

interface ConnectParams {
  onWss: Function;
  wss: WebSocket | null;
};

const useConnect =  ({ wss, onWss }: ConnectParams) => {

  const [token, setToken] = useState("");
  
  const waitForToken = async() => {
    
    const _token =  await checkTokenExpiryAndRenew();
    if(_token)  setToken(_token as string);

  }

  // connect func - is used in the onclose websocket handler
  // to reconnect to the server
  const connect = async() => {

    const _token = await checkTokenExpiryAndRenew();
    if (_token) setToken(_token as string);
    // if we have the token and the websocket is closed or null
    // try to connect
    if ((wss === null || (wss && wss.readyState === WebSocket.CLOSED)) && _token)
      onWss(new WebSocket(`${config.websocketUrl}/?token=${_token}`, ["json"]));

  };

  useEffect(() => {

    if(!token) waitForToken();
    if (!wss && token) connect();

  }, [token, wss]);

  return { connect };
};

export default useConnect;
