"use client";

import * as yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { Formik, Form } from "formik";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import config from "@/config/defaults.json";
import Input from "@/components/common/input";
import authService from "@/services/authService";
import { useRedirectToChat } from "@/helpers/user";
import Divider from "@/components/common/divider";
import SignInWithGoogle from "@/components/signInWithGoogle";
import SignInWithFacebook from "@/components/signInWithFacebook";
import ErrorToast from "@/components/toasts/error";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Please provide a valid email")
      .required("This field is required"),
    password: yup.string().required(),
  });

  // if the user is logged in
  // redirect to '/chat'
  useRedirectToChat();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    authService.login({
      email,
      password,
      setLoading: setIsLoading,
      url: config.onSuccessRouteUrl,
      router,
    });
  };

  const onSuccess = () => {
    router.replace(config.onSuccessRouteUrl);
  };

  return (
    <React.Fragment>
      <div className="w-screen h-screen flex items-center justify-center bg-neutral-50">
        <div className="border p-4 max-w-[300px] relative -top-32 ">
          <div className="my-3">
            <h1 className="text-2xl text-center"> Login </h1>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={(val) => handleSubmit(val)}
            validationSchema={validationSchema}
          >
            <Form className="flex flex-col gap-4" autoComplete="off">
              <Input
                name="email"
                placeholder="Email"
                classes="dark:text-gray-800 dark:bg-transparent"
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                classes="dark:text-gray-800 dark:bg-transparent"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`border p-1 bg-blue-600  text-white rounded-md ${
                  isLoading ? "diFormsabled:opacity-40 disabled:curso-de" : ""
                }`}
              >
                {!isLoading ? "login" : "loading..."}
              </button>
            </Form>
          </Formik>

          <div className="pt-4">
            <Divider text="OR" />
          </div>

          <div className="my-4">
            <SignInWithGoogle onError={setLoginError} onSuccess={onSuccess} />
          </div>

          <div className="my-4">
            <SignInWithFacebook onError={setLoginError} onSuccess={onSuccess} />
          </div>

          <div className="mt-3 text-[13px] text-center space-y-1">
            <p className="dark:text-gray-900 ">
              Sign up for new acount
              <span>
                <Link href="/signup" className="ml-1 underline text-blue-600">
                  SignUp
                </Link>
              </span>
            </p>

            <Link
              href="/forgotPassword"
              className="ml-1 underline text-blue-600 inline-block"
            >
              ForgotPassword?
            </Link>
          </div>
        </div>
      </div>

      <Toaster position="top-center" />
    </React.Fragment>
  );
}
