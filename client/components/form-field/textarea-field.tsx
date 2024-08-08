import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import FormFieldProps from "@/lib/types";
import { useFormContext } from "react-hook-form";

const TextAreaField = (props: FormFieldProps) => {
  const { name, label, placeholder, description } = props;

  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder || "Non renseigné"}
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

export default TextAreaField;
