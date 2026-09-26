import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WindshieldFraming } from "@/components/WindshieldFraming";
import { TachometerCursor } from "@/components/TachometerCursor";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Alla Krishna Sai Reddy — AI/ML Engineer | Generative AI | Full Stack Developer",
  description:
    "AI/ML and full stack engineer who builds LLM applications end to end — LangGraph multi-agent workflows, RAG, and production web systems.",
  keywords: [
    "Alla Krishna Sai Reddy",
    "AI/ML Engineer",
    "Generative AI",
    "Full Stack Developer",
    "LangGraph",
    "RAG",
    "FastAPI",
    "Next.js",
    "PyTorch",
  ],
  authors: [{ name: "Alla Krishna Sai Reddy" }],
  openGraph: {
    title: "Alla Krishna Sai Reddy — AI/ML Engineer | Generative AI | Full Stack Developer",
    description:
      "AI/ML and full stack engineer who builds LLM applications end to end — LangGraph multi-agent workflows, RAG, and production web systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Early synchronous check before first paint to prevent load flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var seen = sessionStorage.getItem('has_seen_intro');
                  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  if (seen === 'true' || reduced) {
                    document.documentElement.classList.add('skip-intro');
                  } else {
                    document.documentElement.classList.add('showing-intro');
                  }
                } catch(e) {
                  document.documentElement.classList.add('showing-intro');
                }
              })();
            `,
          }}
        />
        {/* Clash Display — headings & display type */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap"
        />
        {/* General Sans — body copy & subtext */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500&display=swap"
        />
      </head>
      <body className="min-h-screen text-[#e2e4ea] selection:bg-[#ff6b35] selection:text-white font-body relative overflow-x-hidden">
        {/* Ambient Windshield Framing (Vignette + A-Pillars) */}
        <WindshieldFraming />

        {/* Driver's Seat Tachometer Needle Cursor (Non-touch / pointer:fine only) */}
        <TachometerCursor />

        {children}
      </body>
    </html>
  );
}
