import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormFieldProps from "@/lib/types";
import { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

type Props = FormFieldProps & {
  type?: HTMLInputTypeAttribute;
};

const TextField = (props: Props) => {
  const { name, label, placeholder, description, type } = props;

  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={placeholder || "Non renseigné"}
              type={type}
              {...field}
              onChange={({ target: { value } }) =>
                form.setValue(name, value === "" ? null : value)
              }
              value={field.value || ""}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
