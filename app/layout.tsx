import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

const FigtreeFont = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atlasium — AI Onboarding & Knowledge Platform",
  description:
    "Atlasium preserves company expertise with proactive AI walkthroughs of codebases, infra and workflows. Every new hire ramps faster, knowledge never leaves.",
  openGraph: {
    title: "Atlasium — AI Onboarding & Knowledge Platform",
    description:
      "Atlasium preserves company expertise with proactive AI walkthroughs of codebases, infra and workflows. Every new hire ramps faster, knowledge never leaves.",
    url: "https://atlasium.org",
    siteName: "Atlasium",
    images: [
      {
        url: "/atlasium-founding50.png",
        width: 1280,
        height: 832,
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlasium — AI Onboarding & Knowledge Platform",
    description:
      "Atlasium preserves company expertise with proactive AI walkthroughs of codebases, infra and workflows. Every new hire ramps faster, knowledge never leaves.",
    images: ["/atlasium-founding50.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={FigtreeFont.className}>
        {children}
        <Toaster richColors position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
