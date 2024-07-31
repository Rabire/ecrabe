import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";
import "react-markdown-editor-lite/lib/index.css";

const mdTextToHtml = async (text: string) =>
  DOMPurify.sanitize(await marked.parse(text));

type Props = {
  text: string | null | undefined;
  className?: string;
};

const MdRenderer = ({ text, className }: Props) => {
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
      className={cn("content-info", className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

export default MdRenderer;
