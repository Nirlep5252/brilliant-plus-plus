import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/Navbar";
import { ThemeProvider } from "~/components/theme/theme-provider";
import Providers from "./_components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Edtech HackNUthon",
  description: "~ Team Formality",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
