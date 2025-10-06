import { Controller, useFormContext } from "react-hook-form";
import * as Select from "@radix-ui/react-select";

interface Props {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  isRequired?:boolean;
}

const RHFSelect = ({ name, label, className,isRequired, ...rest }: Props) => {
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
          <div className="flex w-full flex-col relative">
            {label && (
              <label
                htmlFor={name}
                className="mb-2 text-sm text-muted-foreground"
              >
                {label}
                {isRequired && <span className="text-red-500">*</span>}
              </label>
            )}
            <Select.Root
              value={field.value ?? ""}
              onValueChange={field.onChange}
            >
              <Select.Trigger
                className={`inline-flex w-full items-center justify-between rounded border border-gray-300 px-3 py-2 text-left outline-none focus:ring-2 focus:ring-primary`}
                aria-label={label}
              >
                <Select.Value placeholder={rest.placeholder} />
                <Select.Icon>
                  <i className="pi pi-chevron-down" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="z-50 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md">
                  <Select.Viewport className="p-1">
                    {rest.options?.map((opt) => (
                      <Select.Item
                        key={opt.value}
                        value={opt.value}
                        className="flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gray-50"
                      >
                        <Select.ItemText>{opt.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
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
};

export default RHFSelect;
