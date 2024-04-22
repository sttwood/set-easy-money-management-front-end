import type {Metadata} from "next";
import {Inter, Karla} from "next/font/google";
import {Providers} from "./providers";

import "./globals.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {redirect} from "next/navigation";
import {authOptions} from "@/lib/authOptions";
import {getServerSession} from "next-auth";
import {createContext} from "react";
import {SidebarProvider} from "@/context/SidebarContext";

const inter = Inter({subsets: [ "latin" ]});
const karla = Karla({subsets: [ "latin" ]});

export const metadata: Metadata = {
  title: "SET-Easy Money Management",
  description: "SET Easy Money Management tools for tracking and managing your financial",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions)

  // if (session) {
  //   redirect("/dashboard")
  // }

  return (
    <html lang="en">
      <body className={karla.className}>
        <SidebarProvider>
          <Providers>
            {children}
            <ToastContainer />
          </Providers>
        </SidebarProvider>
      </body>
    </html>
  );
}
