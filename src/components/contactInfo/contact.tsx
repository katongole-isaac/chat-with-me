/**
 * Friend Contact info display
 *
 */
import { MdOutlineCall } from "react-icons/md";
import { MdBlockFlipped } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import React, { SetStateAction, useRef } from "react";

import TopHeader from "./topHeader";
import IconButton from "./iconButton";
import useClickOutside from "@/helpers/useOutClick";
import Avatar from "../user/avatar";
import Tabs from "../common/tabs";
import MediaLink from "./media/mediaLink";
import MediaImage from "./media/mediaImage";
import MediaDoc from "./media/mediaDoc";

interface ContactInfoProps {
  showContact: boolean;
  onShowContact: React.Dispatch<SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: React.Dispatch<SetStateAction<string>>;
}

const _tabs = [
  {
    id: 0,
    label: "Media",
  },
  {
    id: 1,
    label: "Links",
  },
  {
    id: 2,
    label: "Docs",
  },
];

const ContactInfo = ({
  showContact,
  onShowContact,
  activeTab,
  setActiveTab,
}: ContactInfoProps) => {
  const contactRef = useRef<HTMLDivElement | null>(null);

  useClickOutside<HTMLDivElement>({
    showModal: showContact,
    onSetShowModal: onShowContact,
    originRef: null,
    popupRef: contactRef,
  });

  const buttons = [
    {
      icon: MdBlockFlipped,
      label: "Block",
    },
    {
      icon: RiDeleteBin6Line,
      label: "Delete",
    },
  ];

  const renderMedia: () => React.JSX.Element = () => {
    switch (activeTab) {
      case "docs":
        return (
          <div className="flex flex-col gap-2">
            <MediaDoc />
            <MediaDoc />
            <MediaDoc />
            <MediaDoc />
            <MediaDoc />
            <MediaDoc />
            <MediaDoc />
            <MediaDoc />
          </div>
        );

      case "links":
        return (
          <div className="flex flex-col gap-2">
            <MediaLink />
            <MediaLink />
            <MediaLink />
            <MediaLink />
            <MediaLink />
            <MediaLink />
          </div>
        );

      case "media":
        return (
          <div className="flex gap-2 flex-wrap">
            <MediaImage />
            <MediaImage />
            <MediaImage />
            <MediaImage />
            <MediaImage />
            <MediaImage />
            <MediaImage />
            <MediaImage />
          </div>
        );

      default:
        return <></>;
    }
  };

  return (
    <div className="w-full h-full absolute backdrop-blur-[1.5px] shadow z-50 flex justify-end overflow-hidden">
      <div ref={contactRef} className="w-[45%] h-full shadow-lg bg-zinc-100">
        {/* top header section */}
        <TopHeader onClick={onShowContact} />

        {/* personal info  */}
        <InfoSection />

        <div className="px-4 py-3">
          <hr />
        </div>

        {/* media buttons */}
        <div className="flex flex-col max-h-max">
          <Tabs
            tabs={_tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* media content based on the active tab */}
        <div className="w-full  min-h-[10%] borderr border-red-400 py-2 max-h-[50%] overflow-y-auto custom-scrollbar">
          {/* No content div */}

          {/* <div className="w-full py-6 flex justify-center items-center">
            <p className="text-slate-500"> No content yet </p>
          </div> */}

          <div className="px-2 h-full w-full  gap-2">{renderMedia()}</div>
        </div>

        <div className="px-4 py-3">
          <hr />
        </div>

        {/* action section */}
        <div className="w-full flex  justify-center gap-4 py-6">
          {buttons.map((item) => (
            <IconButton key={item.label} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

const InfoSection = () => {
  return (
    <div className="flex flex-col items-center gap-2 py-3">
      <Avatar displayName="" photoURL="" avatarSize={70} />
      <span> User Name </span>
      <div className="flex gap-10 text-gray-500">
        <MdOutlineCall size={25} role="button" />
        <VscDeviceCameraVideo size={25} role="button" />
      </div>
    </div>
  );
};
