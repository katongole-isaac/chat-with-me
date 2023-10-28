/**
 * Input Component
 *
 */
import { useField, Field } from "formik";
import React from "react";
import { BsInfoLg } from "react-icons/bs";

const Input = (props:any) => {
  const [field, meta] = useField(props);
  

  const classes = `border p-1 px-2 rounded-md text-slate-600 focus:outline-offset-2 ${props?.classes} ${
    meta.error && meta.touched
      ? "outline-rose-200 outline-offset-2 border-rose-600 "
      : "focus:outline-blue-200 focus:border-blue-500 "
  } `;

  return (
    <div className="w-full">
      {props?.as ? (
        <Field {...props} className={classes} />
      ) : (
        <input {...field} {...props} className={classes} />
      )}
      {meta.touched && meta.error ? (
        <div className="my-1">
          <span className="text-[12px] flex  text-rose-500">
            <BsInfoLg size={15} /> {meta.error}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default Input;
