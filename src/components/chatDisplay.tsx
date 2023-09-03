/**
 * Chat display
 *
 */
import React from "react";

type ChatProps = {
  messages: string[];
};

export default function ChatDisplay({ messages }: ChatProps) {
  console.log(messages);
  return (
    <div className="w-full h-full text-[14px] space-y-2 px-4">
      {messages.map((msg, idx) => (
        <SingleMessage key={idx} message={msg} />
      ))}
    </div>
  );
}

const SingleMessage = ({ message }: { message: string }) => {
  
  const lines = message.split("\n");

  return (
    <div className="py-1 px-4 w-max max-w-[65%] text-slate-800 bg-neutral-200 break-words  rounded-md ">
      <div className="font-sans  hyphens-auto break-words w-full">
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
