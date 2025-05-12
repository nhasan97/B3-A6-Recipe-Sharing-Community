"use client";

import { IFormConfig, IFormProps } from "@/src/types/FX.type";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const FXForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: IFormProps) => {
  const formConfig: IFormConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);
  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      {/*FormProvider behaves like context & enables its children to access all the methods it provides like handleSubmit, reset etc.*/}
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default FXForm;
