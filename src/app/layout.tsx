import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Poppins } from 'next/font/google'

const poppins =  Poppins({
  weight: ['400', '600', '700'], 
  subsets: ['latin'], 
  display: 'swap',
})

export const metadata: Metadata = {
  title: "S3curity",
  description: "Sistema para gerenciamento de segurança",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} antialiased bg-black text-white`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
