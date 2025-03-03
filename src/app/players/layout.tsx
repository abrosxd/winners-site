import type { Metadata } from "next";
import Foot from "@/components/Foot/Foot";

export const metadata: Metadata = {
  title: "Игроки агентства",
  description: "Список игроков хоккейного агентства WINNERS",
  openGraph: {
    title: "Игроки агентства",
    description: "Список игроков хоккейного агентства WINNERS",
    url: "https://wnrs.ru/players",
  },
  twitter: {
    title: "Игроки агентства",
    description: "Список игроков хоккейного агентства WINNERS",
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
