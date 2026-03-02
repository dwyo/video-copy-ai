import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";

export const metadata: Metadata = {
  title: "VideoCopyAI - 短视频文案智能生成工具",
  description: "一键生成情绪反转、干货萃取、争议毒舌三种爆款文案变体，解决短视频创作者'选题废'问题",
  keywords: ["短视频文案", "AI文案生成", "抖音文案", "小红书文案", "文案工具", "内容创作"],
  authors: [{ name: "VideoCopyAI" }],
  openGraph: {
    title: "VideoCopyAI - 短视频文案智能生成工具",
    description: "一键生成爆款短视频文案",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}