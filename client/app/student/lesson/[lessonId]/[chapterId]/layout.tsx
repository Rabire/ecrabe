import { ChapterPageProvider } from "./context";

export default function ChapterPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ChapterPageProvider>{children}</ChapterPageProvider>;
}
