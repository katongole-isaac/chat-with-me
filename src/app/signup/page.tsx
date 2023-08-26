/**
 * Login Page
 *
 */

"use client";

import * as yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import Input from "@/components/input";
import firebaseApp from "@/lib/firebaseApp";
import { getCurrentUser, setAuthUser } from "@/helpers/user";
import SignInWithFacebook from "@/components/signInWithFacebook";
import SignInWithGoogle from "@/components/signInWithGoogle";

const auth = getAuth(firebaseApp);

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const user = getCurrentUser();

  useEffect(() => {
    // if (user) router.replace("/");
  }, [user]);

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
    try {
      setIsLoading(true);
      setLoginError("");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // store user credentials
      setAuthUser(userCredential.user);

      router.replace("/");
    } catch (error: any) {
      console.log(error?.message);

      const errorMessage = error?.message
        .match(/\b(?!Firebase:)\w+\b/g)
        .join(" ");

      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onSuccess = () => {
    router.replace("/");
  };

  return (
    <React.Fragment>
      <div className="w-screen h-screen flex items-center justify-center bg-neutral-50">
        <div className="border p-4 ">
          <div className="my-3">
            <h1 className="text-center text-2xl">Sign Up</h1>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={(val) => handleSubmit(val)}
            validationSchema={validationSchema}
          >
            <Form className="flex flex-col gap-4" autoComplete="off">
              {loginError && (
                <span className="inline-block text-[13px] text-rose-600 font-semibold px-2 py-1 bg-rose-200">
                  {loginError.match(/\b(?!Firebase:)\w+\b/g)?.join(" ")}
                </span>
              )}

              <Input name="email" placeholder="Email" />
              <Input name="password" type="password" placeholder="Password" />
              <button
                type="submit"
                className="border p-1 bg-blue-600 text-white rounded-md "
              >
                {!isLoading ? "signin" : "loading..."}
              </button>
            </Form>
          </Formik>

          <div className="my-4">
            <SignInWithGoogle onError={setLoginError} onSuccess={onSuccess} />
          </div>

          <div className="my-4">
            <SignInWithFacebook onError={setLoginError} onSuccess={onSuccess} />
          </div>

          <div className="mt-3 text-[13px]">
            <p>
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
    </React.Fragment>
  );
}
