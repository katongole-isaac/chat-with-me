/**
 * Message Input
 *
 */

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";

type MsgProps = {
  onSubmit: Function;
};

const MessageInput = ({ onSubmit }: MsgProps) => {
  const [message, setMessage] = useState("");
  const msgInputRef = useRef<HTMLTextAreaElement>(null);

  const [readyToSend, setReadyToSend] = useState(false);

  const handleOnChange = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    // check if there is atleast one character in the message
    if (/[\w\S]+/g.test(target.value)) setReadyToSend(true);
    else setReadyToSend(false);

    setMessage(target.value);
  };

  const handleOnEnter = (e: KeyboardEvent) => {
    // on press Enter key
    if (
      e.code === "Enter" &&
      readyToSend &&
      !(e.shiftKey && e.code === "Enter")
    ) {
      e.preventDefault();
      onSubmit(message);
      msgInputRef.current!.value = "";
      setMessage("");
      setReadyToSend(false);
    }
  };

  const handleSendClick = (msg: string) => {
    if (!(readyToSend && message)) return;

    onSubmit(msg);
    msgInputRef.current!.value = "";
    setMessage("");
    setReadyToSend(false);
  };

  useEffect(() => {
    document.addEventListener("keypress", handleOnEnter);

    return () => {
      document.removeEventListener("keypress", handleOnEnter);
    };
  });

  return (
    <div className=" w-full  py-4 px-2 bg-zinc-100 space-x-2 ">
      <div className="w-full flex items-center justify-center gap-4">
        <textarea
          className="text-[13px] p-3 border rounded-md w-full focus:outline-neutral-200 resize-none"
          placeholder="Type a message"
          value={message}
          ref={msgInputRef}
          onChange={(e) => handleOnChange(e)}
        />

        <button
          disabled={!readyToSend}
          onClick={() => handleSendClick(message)}
          className="disabled disabled:cursor-not-allowed"
        >
          <IoSendSharp
            className={`${
              !readyToSend ? "text-zinc-200" : "text-blue-600"
            } text-[20px] `}
          />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
