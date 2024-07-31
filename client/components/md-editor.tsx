import FormFieldProps from "@/lib/types";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useFormContext } from "react-hook-form";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const mdTextToHtml = async (text: string) =>
  DOMPurify.sanitize(await marked.parse(text));

type Props = FormFieldProps & { className?: string };

const MdEditor = (props: Props) => {
  const { label, name, description, className } = props;

  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <MarkdownEditor
              renderHTML={(text) => mdTextToHtml(text)}
              {...field}
              onChange={({ text }) =>
                form.setValue(name, text === "" ? null : text)
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

export default MdEditor;
