import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./styles/app.css";
import { ApplicationProvider } from "@/providers/application-provider";
import * as Toast from "@radix-ui/react-toast";
import { Alerter } from "@/components/Dialog/Alerter";
// import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"], // Os pesos que você deseja usar
  subsets: ["latin"],
  variable: "--font-roboto", // Definindo uma variável CSS para a fonte
});

export const metadata: Metadata = {
  title: "Documentação Kora",
  description: "Documentação Kora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <ApplicationProvider data={[]}>
          <Alerter />
          <Toast.Provider>{children}</Toast.Provider>
        </ApplicationProvider>
      </body>
    </html>
  );
}
