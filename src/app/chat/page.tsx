/**
 * Chating page
 *
 */
"use client";

import React, { startTransition, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";

import withAuth from "@/lib/auth/withAuth";
import config from "@/config/defaults.json";
import { genUserId } from "@/helpers/genUserId";
import { getCurrentUser, logout, useUpdateToken } from "@/helpers/user";
import { firebaseAuth } from "@/lib/firebaseApp";
import authenicateUser from "@/lib/auth/authenicateUser";
import {
  CommandTypes,
  type ChatMessage,
  type LoggedInUser,
  type MessageFormat,
} from "@/misc/types";

import Profile from "@/components/user/profile";
import ChatMenu from "@/components/chat/chatMenu";
import ChatDisplay from "@/components/chat/chatDisplay";
import MessageInput from "@/components/chat/messageInput";
import DefaultToaster from "@/components/toasts/toasterSetting";
import NotifyToast from "@/components/toasts/notify";
import LostConnectivity from "@/components/lostConnectivity";
import registerServiceWorker from "@/registerServiceWorker";
import useConnect from "@/helpers/useConnect";
import InfinityToast from "@/components/toasts/reconnectToast";
import CreateRoom from "@/components/rooms/createRoom";

registerServiceWorker();

export const UserContext = React.createContext<LoggedInUser | null>(null);

const Chat = () => {
  const [wss, setWss] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | number | null>(null);
  const [reconnecting, setReconnecting] = useState<boolean>(false);
  const [reconnectToastId, setReconnectToastId] = useState<string>("");
  const [ showModal, setShowModal  ] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);

  const user = getCurrentUser();
  const { accessToken } = user.stsTokenManager;

  const [token, setToken] = useState<string>(accessToken);
  useUpdateToken({ onToken: setToken });

  // setting the token
  const { connect } = useConnect({
    onWss: setWss,
    wss,
  });

  // open event
  const handleWebsocketOnOpen = (ev: Event) => {
    // clear any timeout id created on reconnecting
    if (timerId) clearInterval(timerId);

    if (reconnecting) {
      setReconnecting(false);
      toast.dismiss(reconnectToastId);
    }

    const checkOnlineStatus: MessageFormat = {
      type: CommandTypes.LOGIN,
    };

    wss!.send(JSON.stringify(checkOnlineStatus));
  };

  // message event
  const handleWebsocketOnMessage = (ev: MessageEvent) => {
    const data = JSON.parse(ev.data) as MessageFormat;

    switch (data.type) {
      case CommandTypes.ERROR_ROOM:
        toast.custom(<NotifyToast message={data.params?.message} ErrorIcon />);
        break;

      case CommandTypes.SUCCESS_ROOM:
        toast.success(`${data.params?.message}`, {position:"bottom-left",duration: 8000} )
      break;

      default:
        console.log("Invalid message type", data);
    }

    setMessages((prev) => [...prev, ev.data]);
  };

  const handleWebsocketOnError = (ev: Event) => {
    console.log('websocket error');
  };

  const handleSubmitMsg = (msg: string) => {
    console.log(msg);
    // setMessages((prev) => [...prev, msg]);
    if (wss) {
      wss.send(`{msg: null}`);
    }
  };

  const handleWebsocketOnClose = (ev: CloseEvent) => {
    console.log("socket closed");
    let timeout;

    // reseting reconnecting state
    setReconnecting(true);

    if (!reconnecting) setReconnecting(true);

    timeout = setInterval(() => {
      connect(); // reconnect;
    }, 1000);

    setTimerId(timeout);
  };

  const handleProfileClick = () => {
    startTransition(() => {
      setShowProfile((prev) => !prev);
    });
  };

  useEffect(() => {

    if (wss) {
      console.log('rendering...');

      wss.addEventListener("open", handleWebsocketOnOpen);
      wss.addEventListener("message", handleWebsocketOnMessage);
      wss.addEventListener("error", handleWebsocketOnError);
      wss.addEventListener("close", handleWebsocketOnClose);

      // unsubcribe to events
      return () => {
        wss.removeEventListener("open", handleWebsocketOnOpen);
        wss.removeEventListener("message", handleWebsocketOnMessage);
        wss.removeEventListener("error", handleWebsocketOnError);
        wss.removeEventListener("close", handleWebsocketOnClose);
      };
    }
  }, [wss]);

  return (
    <UserContext.Provider value={{ user, wss }}>
     {showModal &&  <CreateRoom onModal={setShowModal} showModal={showModal} />}
      <div className="w-screen h-screen bg-zinc-200">
        <div className="py-8 w-full h-full ">
          <div className="max-w-[1200px] bg-zinc-100 h-full shadow-lg  m-auto border ">
            <div className="grid grid-cols-[1.5fr_3fr] h-full">
              {/* fist grid */}
              <div className="w-full h-full overflow-y-auto max-h-full  min-w-0 min-h-0 relative custom-scrollbar">
                {!showProfile && (
                  <ChatMenu onShowModal={setShowModal} onProfileClick={handleProfileClick} />
                )}

                {showProfile && (
                  <Profile onClose={setShowProfile} showProfile={showProfile} />
                )}
                <LostConnectivity />
              </div>

              {/* second grid */}
              <div className="border-l min-w-0 min-h-0 relative">
                <div className="h-full flex flex-col">
                  <div className="flex-1">
                    <div className="max-h-[810px] h-full min-h-[810px] relative custom-scrollbar overflow-y-auto ">
                      <ChatDisplay ref={chatRef} messages={messages} />
                    </div>
                  </div>
                  <div className="">
                    <MessageInput onSubmit={handleSubmitMsg} ref={chatRef} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {reconnecting && (
        <InfinityToast
          id="reconnect"
          enabler={reconnecting}
          message="Reconnecting..."
          onSetToast={setReconnectToastId}
        />
      )}
      <DefaultToaster />
    </UserContext.Provider>
  );
};

export default withAuth(Chat);