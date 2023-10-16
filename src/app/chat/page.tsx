/**
 * Chating page
 *
 */
"use client";

import React, { startTransition, useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";

import withAuth from "@/lib/auth/withAuth";
import { genUserId } from "@/helpers/genUserId";
import { getCurrentUser, logout, useUpdateToken } from "@/helpers/user";
import {
  CommandTypes,
  type ChatMessage,
  type LoggedInUser,
  type MessageFormat,
} from "@/misc/types";

import Profile from "@/components/user/profile";
import ChatMenu from "@/components/chat/chatMenu";
import Conversation from "@/components/chat/conversation";
import MessageInput from "@/components/chat/messageInput";
import DefaultToaster from "@/components/toasts/toasterSetting";
import NotifyToast from "@/components/toasts/notify";
import LostConnectivity from "@/components/lostConnectivity";
import registerServiceWorker from "@/registerServiceWorker";
import useConnect from "@/helpers/useConnect";
import InfinityToast from "@/components/toasts/reconnectToast";
import CreateRoom from "@/components/rooms/createRoom";
import Tabs from "@/components/common/tabs";
import ChatLists from "@/components/chat/chatLists";
import Search from "@/components/common/search";
import ChatTopBar from "@/components/chat/chatTopBar";

registerServiceWorker();

export const UserContext = React.createContext<LoggedInUser | null>(null);

const Chat = () => {
  const [wss, setWss] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | number | null>(null);
  const [reconnecting, setReconnecting] = useState<boolean>(false);
  const [reconnectToastId, setReconnectToastId] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);

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

    const queries: MessageFormat[] = [
      {
        type: CommandTypes.GET_ROOMS_INFO,
        params: { uid: user.uid },
      },
      {
        type: CommandTypes.LOGIN,
      },
    ];

    queries.forEach((query) => wss!.send(JSON.stringify(query)));
  };

  // message event
  const handleWebsocketOnMessage = (ev: MessageEvent) => {
    const data = JSON.parse(ev.data) as MessageFormat;

    switch (data.type) {
      case CommandTypes.ERROR_ROOM:
        toast.custom(<NotifyToast message={data.params?.message} ErrorIcon />);
        break;

      case CommandTypes.SUCCESS_ROOM:
        toast.success(`${data.params?.message}`, {
          position: "bottom-left",
          duration: 5000,
        });
        break;
      case CommandTypes.GET_ROOMS_INFO:
        setRooms(data.params?.rooms);
        break;

      default:
        console.log("Invalid message type", data);
    }

    setMessages((prev) => [...prev, ev.data]);
  };

  const handleWebsocketOnError = (ev: Event) => {
    console.log("websocket error");
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
      console.log("rendering...");

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
      {showModal && <CreateRoom onModal={setShowModal} showModal={showModal} />}
      <div className="w-screen h-screen bg-zinc-200">
        <div className="py-8 w-full h-full flex justify-center items-center ">
          <div className="max-w-[1200px] bg-zinc-100 h-full shadow-lg  m-auto border ">
            <div className="grid grid-cols-[1.5fr_3fr] h-full">
              {/* fist grid */}
              <div className="w-full h-full max-h-full  min-w-0 min-h-0 relative">
                {showProfile ? (
                  <Profile onClose={setShowProfile} showProfile={showProfile} />
                ) : (
                  <div className="w-full h-full flex flex-col ">
                    <div className="">
                      <ChatMenu
                        onShowModal={setShowModal}
                        onProfileClick={handleProfileClick}
                      />
                      <Search />
                      <Tabs />
                    </div>

                    <div className="w-full flex-1 h-full overflow-y-auto  custom-scrollbar ">
                      <ChatLists />
                    </div>
                  </div>
                )}

                <LostConnectivity />
              </div>

              {/* second grid */}
              <div className="border-l min-w-0 min-h-0 max-h-full relative ">
                <div className="h-full max-h-full flex flex-col">
                  {/* chat top bar */}
                  <div className="">
                    <ChatTopBar />
                  </div>

                  {/*  chat message section
                   * Conversation
                   */}
                  <div className="w-full flex-1 overflow-y-auto custom-scrollbar ">
                    <Conversation ref={chatRef} messages={messages} />
                  </div>
                  

                  {/* message Input */}
                  <div className="basis-20 absolute bottom-0 w-full max-h-32 overflow-clip ">
                    <MessageInput onSubmit={handleSubmitMsg} ref={chatRef} />
                  </div>

                  {/* This element occupy the space for the message input because the message input is postion absolute  */}
                  <div className="basis-20"></div>
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