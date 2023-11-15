/**
 * Friend Contact info display
 *
 */
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { SetStateAction, useRef, useState } from "react";

import TopHeader from "./topHeader";
import IconButton from "./iconButton";
import Avatar from "../user/avatar";
import Tabs from "../common/tabs";
import MediaLink from "./media/mediaLink";
import MediaImage from "./media/mediaImage";
import MediaDoc from "./media/mediaDoc";
import Modal from "../common/modal";

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

  const [isModalOpen, setIsModalOpen] = useState({
    label: "",
    open: false,
  });

  const onCancel = () => setIsModalOpen((prev) => ({ ...prev, open: false }));

  const modalOptions = {
    block: {
      title: "Block this contact",
      description: "Are you sure you want to block this contact",
      onCancel,
      onContinue: () => {},
    },
    delete: {
      title: "Delete this Chat",
      description: "Are you sure you want to delete this chat",
      onCancel,
      onContinue: () => {},
    },
  };

  const handleButtonClick = (label: string) =>
    setIsModalOpen({ label, open: true });

  const getModalKeyValue = (modal: any): any => {
    for (let key in modal) if (key === isModalOpen.label) return modal[key];
  };

  const buttons = [
    {
      icon: MdBlock,
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
    <div className="w-full h-full absolute backdrop-filter backdrop-brightness-50 shadow z-50 flex justify-end overflow-hidden">
      {isModalOpen.open && <Modal {...getModalKeyValue(modalOptions)} />}
      <div
        ref={contactRef}
        className="w-[45%] z-30 h-full shadow-lg bg-zinc-100 dark:bg-[#232323]"
      >
        {/* top header section */}
        <TopHeader onClick={onShowContact} />

        {/* personal info  */}
        <InfoSection />

        <div className="px-4 py-3">
          <hr className="dark:border-neutral-700" />
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
        <div className="w-full  min-h-[50%]  py-2 max-h-[50%] overflow-y-auto custom-scrollbar">
          {/* No content div */}

          {/* <div className="w-full py-6 flex justify-center items-center">
            <p className="text-slate-500"> No content yet </p>
          </div> */}

          <div className="px-2 h-full w-full  gap-2">{renderMedia()}</div>
        </div>

        <div className="px-4 py-3">
          <hr className="dark:border-neutral-700" />
        </div>

        {/* action section */}
        <div className="w-full flex  justify-center gap-4 py-6">
          {buttons.map((item) => (
            <IconButton
              key={item.label}
              {...item}
              onClick={handleButtonClick}
            />
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
      <Avatar
        displayName=""
        photoURL=""
        avatarSize={90}
        imageClassName="max-w-[60px]"
      />
      <span className="text-gray-800 dark:text-gray-300"> User Name </span>
      <div className="flex gap-10 text-gray-500 dark:text-gray-300 ">
        <IoCall size={25} role="button" />
        <FaVideo size={25} role="button" />
      </div>
    </div>
  );
};
