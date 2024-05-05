import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdTextToHtml = async (text: string) =>
  DOMPurify.sanitize(await marked.parse(text));

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
};

export const MdEditor = (props: Props) => {
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

export const RenderMd = ({ text }: { text: string | null | undefined }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      const htmlContent = await mdTextToHtml(text || "");
      setContent(htmlContent);
    };

    fetchContent();
  }, [text]);

  if (!text) return null;

  return (
    <div
      className="content-info"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};
