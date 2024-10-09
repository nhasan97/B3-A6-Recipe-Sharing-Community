"use client";

import { IFXInputProps } from "@/src/types";
import { Input, Textarea } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";

const FXTextarea = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: IFXInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Textarea
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      variant={variant}
      size={size}
      required={required}
      type={type}
      label={label}
      minRows={6}
    />
  );
};

export default FXTextarea;
