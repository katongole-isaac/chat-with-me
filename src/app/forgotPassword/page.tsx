"use client";

import * as yup from "yup";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { sendPasswordResetEmail } from "firebase/auth";

import Input from "@/components/common/input";
import { firebaseAuth } from "@/lib/firebaseApp";
import authService from "@/services/authService";

export default function () {

  const initialValues = {
    email: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Please provide a valid email")
      .required("This field is required"),
  });

  const handleSubmit = async (val: any) => {

    const { email } = val as { email: string };

    authService.resetPassword(email);


  };

  return (
    <React.Fragment>
      <div className="w-screen h-screen flex items-center justify-center bg-neutral-50">
        <div className="flex flex-col gap-2 relative -top-36">
            
          {/* title */}
          <div className="pb-4">
            <h1 className="text-2xl"> Forgot Password </h1>
          </div>

          {/* form */}
          <div className="border p-4 max-w-[300px] space-y-3 ">
            <Formik
              initialValues={initialValues}
              onSubmit={(val) => handleSubmit(val)}
              validationSchema={validationSchema}
            >
              <Form className="space-y-3" autoComplete="off">
                <Input
                  name="email"
                  placeholder="example@gmail.com"
                  classes="dark:text-gray-800 dark:bg-transparent"
                />
                <button
                  type="submit"
                  className={`border p-1 bg-blue-600 text-[13px] w-full text-white rounded-md `}
                >
                  Get reset password Link
                </button>
              </Form>
            </Formik>

            {/* back button */}
            <Link
              href="/login"
              className="flex gap-1 text-[12px] text-blue-600 hover:underline items-center"
            >
              <MdOutlineArrowBackIos />
              <span>Back to login</span>
            </Link>
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />
    </React.Fragment>
  );
}
