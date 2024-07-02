import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

const FileField = (props: FormFieldProps) => {
  const { name, label, placeholder, description } = props;

  const form = useFormContext();

  const fileRef = form.register("file");

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
              type="file"
              {...fileRef}
              onChange={(event) => {
                field.onChange(event.target?.files?.[0] ?? undefined);
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileField;
