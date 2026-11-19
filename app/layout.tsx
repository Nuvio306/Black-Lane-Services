import type { Metadata, Viewport } from "next";
import { Saira, EB_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { themeInitScript } from "@/lib/theme";

const saira = Saira({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-saira",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

// Used only for the footer labels
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  // PLACEHOLDER domain
  metadataBase: new URL("https://blacklaneservices.example"),
  title: "Black Lane Services | VIP Service",
  description:
    "Chauffeured stretch, SUV and Sprinter limousines across New York City for weddings, proms, nights out and airport arrivals.",
  openGraph: {
    title: "Black Lane Services",
    description: "Chauffeured limousines across New York City.",
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#060606",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${saira.variable} ${garamond.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
