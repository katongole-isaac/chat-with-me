/**
 * Include different message components
 *
 */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LiaDownloadSolid } from "react-icons/lia";
import { AiOutlineLink } from "react-icons/ai";

import GameImage from "@/assets/images/games.png";

export const Timeline = ({ text }: { text: String }) => {
  return (
    <div className="relative flex items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-gray-400">{text}</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
};

// used to display text message lines
const TextLine = ({ message }: any) => {
  const lines = message.split("\n");

  return (
    <div className="font-sans hyphens-none break-words w-full">
      <span>
        {lines.map((line: string, index: number) => (
          <React.Fragment key={index}>
            {line}
            {index !== lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    </div>
  );
};

export const Text = ({ message, incoming, classes }: any) => {
  return (
    <div
      className={` ${
        incoming
          ? "self-start bg-white text-slate-900 "
          : "self-end bg-blue-500 text-white "
      } py-2 px-4 w-max  break-words rounded-md ${
        classes ? classes : "max-w-[65%] "
      } `}
    >
      <TextLine message={message} />
    </div>
  );
};

export const Media = ({ message, incoming }: any) => {
  return (
    <div
      className={`flex flex-col gap-2  ${
        incoming ? "self-start bg-white " : "self-end bg-blue-500"
      }  max-w-[350px] max-h-auto rounded-md `}
    >
      {/* image wrapper */}
      <div className={`p-1 overflow-hidden rounded-md  cursor-pointer `}>
        <Image
          src={GameImage}
          alt=""
          width={`${350}`}
          height={100}
          className="h-auto w-auto "
        />
        {/* <IoImageOutline className="w-full h-full text-gray-400" /> */}
      </div>
      <Text message={message} incoming={incoming} classes="max-w-[100%]" />
    </div>
  );
};

export const Reply = ({ reply, message, incoming }: any) => {
  return (
    <div
      className={`  ${
        incoming ? "self-start bg-white " : "self-end bg-blue-500"
      } p-1 rounded-md max-w-[65%]`}
    >
      {/*  quotting the reply message */}
      <div className="bg-[#fafafa] text-gray-500 border-l-4 p-1 rounded-md ">
        <TextLine message={reply} />
      </div>
      {/* original message */}
      <div className="text-white p-1">
        <TextLine message={message} />
      </div>
    </div>
  );
};

export const LinkMsg = ({ incoming, message }: any) => {
  return (
    <div
      className={` ${
        incoming
          ? "self-start bg-white text-slate-900 "
          : "self-end bg-blue-500 text-white "
      } py-2 px-2 w-max max-w-[65%] space-y-1 break-words rounded-md `}
    >
      <Link
        href={`http://www.youtube.com`}
        target="_blank"
        className={`${
          incoming ? "bg-blue-100 text-blue-400" : "bg-[#fafafa] text-sky-600"
        } flex gap-2 items-center px-2 rounded-md py-1 cursor-pointer hover:underline`}
      >
        <AiOutlineLink size={25} className={`${incoming ? "" : ""}`} />
        <div className="flex flex-col gap-1">
          <span> http://www.youtube.com </span>
        </div>
      </Link>
      <TextLine message={message} />
    </div>
  );
};

export const MediaDocument = ({ incoming, message }: any) => {
  return (
    <div
      className={` ${
        incoming
          ? "self-start bg-white text-slate-900 "
          : "self-end bg-blue-500 text-white "
      } py-2 px-2 w-max max-w-[65%] space-y-1 break-words rounded-md `}
    >
      <div className={`p-1 overflow-hidden rounded-md  cursor-pointer `}>
        <Image
          src={GameImage}
          alt=""
          width={`${350}`}
          height={100}
          className="h-auto w-auto "
        />
      </div>

      <div className="flex gap-3 w-full justify-between items-center bg-slate-100 p-2 rounded-md">
        <span className="text-gray-500" >Master JavaaScript and TypeScrit PDF</span>
        <div
          role="button"
          className=" flex justify-center items-center w-8 h-8 border border-slate-400 rounded-full "
        >
          <LiaDownloadSolid size={20} className=" text-gray-400" />
        </div>
      </div>
      <Text message={message} incoming={incoming} classes="max-w-[100%]" />
    </div>
  );
};
