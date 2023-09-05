/**
 * Chat display
 *
 */
import React from "react";

type ChatProps = {
  messages: string[];
  chatRef?: any;
};

function ChatDisplay({ messages, chatRef }: ChatProps) {
  return (
    <div
      ref={chatRef}
      className="w-full min-h-0 h-full space-y-2 px-4 py-2 pb-8 text-[14px] overflow-y-auto justify-end flex flex-col custom-scrollbar"
    >
      {messages.map((msg, idx) => (
        <SingleMessage key={idx} message={msg} />
      ))}
      
    </div>
  );
}

const SingleMessage = ({ message }: { message: string }) => {
  const lines = message.split("\n");

  return (
    <div className="  py-1 px-4 w-max max-w-[65%] text-slate-800 bg-neutral-200 break-words  rounded-md ">
      <div className="font-sans hyphens-auto break-words w-full">
        <span>
          {lines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index !== lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
      </div>
    </div>
  );
};

export default React.forwardRef((props: any, ref) => (
  <ChatDisplay {...props} chatRef={ref} />
));
