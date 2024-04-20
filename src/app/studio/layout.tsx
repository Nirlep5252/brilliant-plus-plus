import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Sidebar from "~/components/studio/sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Edtech HackNUthon",
  description: "~ Team Formality",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
