import type { Metadata } from "next";
import Foot from "@/components/Foot/Foot";

export const metadata: Metadata = {
  title: "Команда агентства",
  description: "Команда хоккейного агентства WINNERS",
  openGraph: {
    title: "Команда агентства",
    description: "Команда хоккейного агентства WINNERS",
    url: "https://wnrs.ru/agency",
  },
  twitter: {
    title: "Команда агентства",
    description: "Команда хоккейного агентства WINNERS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Foot />
    </div>
  );
}
