import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";
import TanQueryClientProvider from "@/providers/query-client-provider";
import { SessionProvider } from "@/providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <TanQueryClientProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
            <Toaster />
          </TanQueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
