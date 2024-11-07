import { ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";

export interface IFXModalProps {
  title: string;
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "xs"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full"
    | undefined;
  children: ReactNode;
  buttonText: string | React.ReactNode;
  buttonVariant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  buttonClassName?: string;
  buttonSize?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  isIconOnly?: boolean;
}

export interface IFormConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

export interface IFormProps extends IFormConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

export interface IFXInputProps {
  variant?: "flat" | "bordered" | "faded" | "underlined" | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  required?: boolean;
  readOnly?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}

export interface ISelectProps extends IFXInputProps {
  options: { key: string; label: string }[];
}
