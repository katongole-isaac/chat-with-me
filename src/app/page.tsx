"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import Input from "@/components/input";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import firebaseApp from "@/lib/firebaseApp";
import Link from "next/link";

const auth = getAuth(firebaseApp);

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

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
    } catch (error: any) {
      setLoginError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <h1> Index </h1>
    </React.Fragment>
  );
}
