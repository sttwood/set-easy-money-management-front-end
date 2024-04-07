import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Providers} from "./providers";

import "./globals.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({subsets: [ "latin" ]});

export const metadata: Metadata = {
  title: "SET-Easy Money Management",
  description: "SET Easy Money Management tools for tracking and managing your financial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
