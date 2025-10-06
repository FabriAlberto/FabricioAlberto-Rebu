import { Controller, useFormContext } from "react-hook-form";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  forwardRef,
} from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  name: string;
  classNameInput?: string;
  className?: string;
  icon?: ReactElement;
  isRequired?: boolean;
}

const RHFInput = forwardRef<HTMLInputElement, Props>(function RHFInput(
  { name, label, classNameInput, className, isRequired, ...rest }: Props,
  ref
) {
  const {
    control,
    formState: { isValid },
  } = useFormContext();
  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col w-full relative">
            {label && (
              <label
                htmlFor={name}
                className="mb-2 text-sm text-muted-foreground"
              >
                {label}
                {isRequired && <span className="text-red-500">*</span>}
              </label>
            )}
            <input
              {...field}
              id={name}
              className={`w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-primary ${
                classNameInput ?? ""
              }`}
              ref={ref}
              {...rest}
            />
            {error?.message && !isValid && (
              <p className="absolute -bottom-5 left-0 text-xs text-red-500 bg-white px-1 animate-in slide-in-from-top-1 duration-200">
                {error?.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
});

export default RHFInput;
