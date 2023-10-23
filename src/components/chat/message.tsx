/**
 * Message Component
 *  Displays messages in the conversation component
 *
 */

import React, { useState } from "react";
import {
  Media,
  Timeline,
  Reply,
  LinkMsg,
  MediaDocument,
  TextMsg,
} from "./messageTypes";

import { IPopupOptionsContext, IPopupOptions } from "@/misc/types/popupOptions";

export const MessageOptionContext =
  React.createContext<IPopupOptionsContext | null>(null);

const chat_history = [
  {
    type: "msg",
    message: "Hi how are you?",
    incoming: true, // indicate whether its an incoming message and should be left align other align right
  },
  {
    type: "divider", // timeline
    text: "Today",
  },
  {
    type: "msg",
    subtype: "img",
    image: "path/to/image",
    message:
      "s nostrum quae hic, fugiat ea nisi minus distinctio. Non consectetur natus placeat aliquid quaerat nesciunt rerum quas, quae quibusdam temporibus vitae quod eligendi velit harum iste sit minima maxime dignissimos quo! Recusandae error reiciendis nesciunt voluptate totam. Quae necessitatibus delectus dolores dolor placeat sapiente fuga debitis illum odit! Perferendis eum odit quis dolor atque vel magnam enim dignissimos tempora deserunt eligendi, neque ea iste cum quibusdam nulla quasi voluptatem omnis? Aperiam ab facilis cupiditate eos aut magni f",
    incoming: true,
  },
  {
    type: "msg",
    subtype: "link",
    message: "this is a link",
    incoming: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "You can download this file ! please",
    incoming: true,
  },
  {
    type: "msg",
    subtype: "reply",
    reply:
      " dignissimos tempora deserunt eligendi, neque ea iste cum quibusdam nulla quasi voluptatem omnis? Aperiam ab facilis cupiditate eos aut magni fugiat suscipit molestiae corrupti earum nostrum velit quam vero praesentium quibusdam, odit repellat, ratione molestias quos sunt natus deserunt doloremque eius alias. Cum molestias iure dolorum animi natus nam excepturi nostrum, consequuntur numquam, quos placeat quo autem culpa. Eum animi quaerat cum est, laborum unde labore doloremque saepe tempora esse impedit. Soluta architecto impedit iste quia cum delectus itaque nisi doloremque? Libero, necessitatibus sequi velit voluptas repudiandae nisi cumque dolorem, ducimus, rerum in dolorum odit incidunt natus vitae",
    message: "this is the original message",
    incoming: false,
  },
  {
    type: "msg",
    message:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab reiciendis officiis eius minus error adipisci. Sed libero non veniam fugit soluta possimus nobis nostrum quae hic, fugiat ea nisi minus distinctio. Non consectetur natus placeat aliquid quaerat nesciunt rerum quas, quae quibusdam temporibus vitae quod eligendi velit harum iste sit minima maxime dignissimos quo! Recusandae error reiciendis nesciunt voluptate totam. Quae necessitatibus delectus dolores dolor placeat sapiente fuga debitis illum odit! Perferendis eum odit quis dolor atque vel magnam enim dignissimos tempora deserunt eligendi, neque ea iste cum quibusdam nulla quasi voluptatem omnis? Aperiam ab facilis cupiditate eos aut magni fugiat suscipit molestiae corrupti earum nostrum velit quam vero praesentium quibusdam, odit repellat, ratione molestias quos sunt natus deserunt doloremque eius alias. Cum molestias iure dolorum animi natus nam excepturi nostrum, consequuntur numquam, quos placeat quo autem culpa. Eum animi quaerat cum est, laborum unde labore doloremque saepe tempora esse impedit. Soluta architecto impedit iste quia cum delectus itaque nisi doloremque? Libero, necessitatibus sequi velit voluptas repudiandae nisi cumque dolorem, ducimus, rerum in dolorum odit incidunt natus vitae doloribus perferendis modi? Recusandae dicta, officiis itaque suscipit in placeat sit ratione excepturi veniam, quisquam aut, architecto quae. Maxime, incidunt. Sit, at.",
    incoming: false,
  },
];

export default function Message() {
  const [showMessageOption, setShowMessageOption] = useState<IPopupOptions>({
    isOpen: false,
    id: "",
  });

  return (
    <MessageOptionContext.Provider
      value={{
        showPopUpOptions: showMessageOption,
        onShowPopUpOptions: setShowMessageOption,
      }}
    >
      <div className="flex flex-col gap-4 w-full justify-end">
        {chat_history.map((item, idx) => {
          switch (item.type) {
            case "divider":
              // timeline
              return (
                <Timeline key={idx} text={item.text as string} {...item} />
              );
            case "msg":
              switch (item.subtype) {
                case "img":
                  return <Media key={idx} {...item} id={idx} />;

                case "link":
                  return <LinkMsg key={idx} {...item} id={idx} />;

                case "doc":
                  return <MediaDocument key={idx} {...item} id={idx} />;

                case "reply":
                  return <Reply key={idx} {...item} id={idx} />;

                default:
                  // text
                  return <TextMsg key={idx} {...item} id={idx} />;
              }

            default:
              break;
          }
        })}
      </div>
    </MessageOptionContext.Provider>
  );
}
