import { ISelectProps } from "@/src/types/FX.type";
import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

const FXSelect = ({
  options,
  variant = "bordered",
  size = "md",
  required = false,
  disabled = false,
  label,
  name,
}: ISelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      {...register(name)}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isInvalid={!!errors[name]}
      variant={variant}
      size={size}
      required={required}
      isDisabled={disabled}
      label={label}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default FXSelect;
