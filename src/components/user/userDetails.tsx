/**
 * Showing User Details
 *
 */

import React, { useContext } from "react";
import * as yup from "yup";

import Avatar from "./avatar";
import { LoggedInUser } from "@/misc/types";
import { UserContext } from "@/app/chat/page";
import { Form, Formik } from "formik";
import Input from "../common/input";

export default function UserDetails() {

  const { user } = useContext(UserContext) as LoggedInUser;

  const aboutWordLimit = 200;

  if (!user) return null;

  const { photoURL, displayName } = user?.providerData[0];
  const validationSchema = yup.object({
    userName: yup
      .string()
      .min(3, "${path} must atleast have 3 char(s)")
      .required(),
    about: yup.string(),
  });

  const handleSubmit = (values:Record<string, string>) => {
    console.log(values);
  };  

  const darkModeInputClasses =
    "dark:bg-[#343434]  dark:text-gray-300  dark:border-[#343434]  dark:focus:outline-none ";
  return (
    <div className="w-full ">
      <div className="w-full flex p-3 pb-4 items-center justify-center">
        <Avatar
          displayName={displayName}
          photoURL={photoURL}
          avatarSize={100}
          imageClassName="max-w-[90px]"
        />
      </div>

      <div className="flex flex-col px-3 gap-2 ">
        {/* userName */}

        <Formik
          initialValues={{
            userName: "Isaac Katongole",
            about: "Hey, I'm currently using chat_with_me",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form className="w-full flex-1 space-y-3">
            <div className="">
              <Input
                name="userName"
                classes={`w-full text-[14px] ${darkModeInputClasses}`}
              />

              {/* Info note */}
              <div className="flex gap-2  mt-2 items-center text-[13px]">
                {/* <FaInfo className="text-gray-800 font-semibold" /> */}
                <span className="text-gray-600 dark:text-gray-400">
                  This name is visible to you friends{" "}
                </span>
              </div>
            </div>

            {/* About */}
            <div className="space-y-2">
              <div className="">
                <p className="text-slate-700 dark:text-gray-300">About</p>
              </div>

              <Input
                as="textarea"
                name="about"
                classes={`w-full text-[14px] resize-none custom-scrollbar ${darkModeInputClasses} `}
                rows={5}
                maxLength={aboutWordLimit}
              />
              <div className="text-gray-500 dark:text-[#fafafa86] text-[12px] flex justify-end">
                <span>max 120 characters </span>
              </div>
            </div>

            {/* submit btn */}
            <button
              type="submit"
              className="px-4 py-1 font-medium flex justify-center items-center bg-blue-500 dark:bg-[#343434] rounded-md shadow-md text-white"
            >
              save
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}


