"use client";

import * as yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Input from "@/components/input";
import firebaseApp from "@/lib/firebaseApp";
import { useCurrentUser } from "@/helpers/user";

const auth = getAuth(firebaseApp);

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  useCurrentUser;
  const user = useCurrentUser();

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

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      setLoginError("");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      console.log(userCredential);
      localStorage.setItem("user", JSON.stringify(userCredential));

      router.push("/");
    } catch (error: any) {
      setLoginError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="w-screen h-screen flex items-center justify-center bg-neutral-50">
        <div className="border p-4 max-w-[300px] ">
          <div className="my-3">
            <h1 className="text-2xl text-center"> Login </h1>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={(val) => handleSubmit(val)}
            validationSchema={validationSchema}
          >
            <Form className="flex flex-col gap-4" autoComplete="off">
              {loginError && (
                <span className="inline-block text-[13px] text-rose-600 font-semibold px-2 py-1 bg-rose-200">
                  {loginError}
                </span>
              )}

              <Input name="email" placeholder="Email" />
              <Input name="password" type="password" placeholder="Password" />
              <button
                type="submit"
                className="border p-1 bg-blue-600 text-white rounded-md "
              >
                {!isLoading ? "login" : "loading..."}
              </button>
            </Form>
          </Formik>
          <div className="mt-3 text-[13px]">
            <p>
              Sign up for new acount
              <span>
                <Link href="/signup" className="ml-1 underline text-blue-600">
                  Here
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
