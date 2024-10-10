import { ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";

export interface IFXModalProps {
  title: string;
  buttonText: string;
  children: ReactNode;
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
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}

export interface ISelectProps extends IFXInputProps {
  options: { key: string; label: string }[];
}
