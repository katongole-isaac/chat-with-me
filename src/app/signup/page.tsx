/**
 * Login Page
 *
 */

"use client";

import * as yup from "yup";
import Link from "next/link";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import firebaseApp from "@/lib/firebaseApp";
import { getCurrentUser, setAuthUser, useRedirectToChat } from "@/helpers/user";
import config from "@/config/defaults.json";

import Input from "@/components/common/input";
import Divider from "@/components/common/divider";
import SignInWithFacebook from "@/components/signInWithFacebook";
import SignInWithGoogle from "@/components/signInWithGoogle";
import authService from "@/services/authService";

const auth = getAuth(firebaseApp);

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  // if the user is logged in
  // don't show signup page
  useRedirectToChat();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Please provide a valid email")
      .required("This field is required"),
    password: yup
      .string()
      .min(8, "Password must atleat have ${min} char(s)")
      .required(),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {

    const {email, password } = values;

    authService.signup({setLoading: setIsLoading, router, url: config.onSuccessRouteUrl, email , password})
  };

  const onSuccess = () => {
    router.replace(config.onSuccessRouteUrl);
  };

  return (
    <React.Fragment>
      <div className="w-screen h-screen  flex items-center justify-center bg-neutral-50">
        <div className="border relative -top-28  p-4 pb-8 ">
          <div className="my-3">
            <h1 className="text-center text-2xl dark:text-gray-800">Sign Up</h1>
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
                className="border p-1 bg-blue-600 text-white rounded-md "
              >
                {!isLoading ? "signin" : "loading..."}
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

          <div className="mt-3 text-[13px]">
            <p className="dark:text-gray-900 text-center">
              Already have an account?
              <span>
                <Link
                  href="/login"
                  className="ml-1 hover:underline hover:text-blue-600"
                >
                  Login
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </React.Fragment>
  );
}
