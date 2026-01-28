import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Xivn - Minecraft Plugin & Server Development",
  description: "Hi, I’m Xivn, a Minecraft developer with a focus on custom items, plugin development, server configuration, and overall server management. I enjoy building systems that make servers feel unique and fun to play on. I’m a California native now living in Florida, happily married, and always excited to collaborate with new people. I now offer plugin development and additional services through my Discord, so if you’re working on a server or have an idea you’d like to bring to life, feel free to reach out. I’d love to chat and see what we can build together.",
  keywords: ["Minecraft", "plugin development", "server management", "custom gameplay", "performance optimization"],
  authors: [{ name: "Xivn" }],
  creator: "Xivn",
  publisher: "Xivn LLC",
  openGraph: {
    title: "Xivn - Minecraft Development",
    description: "Custom Minecraft plugins, server optimization, and unique gameplay experiences.",
    url: "https://xivn.dev/",
    siteName: "Xivn",
    images: [
      {
        url: "https://api.mcheads.org/head/xivnn/250",
        width: 1200,
        height: 630,
        alt: "Xivn - Minecraft Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  themeColor: "#4285f4",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://xivn.dev/",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
