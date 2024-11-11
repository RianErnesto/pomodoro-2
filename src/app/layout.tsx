import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/ui/header";
import { PomodoroProvider } from "@/contexts/pomodoro.context";
import Favicon from "@/components/Favicon";
import Title from "@/components/Title";
import { ThemeProvider } from "@/contexts/theme.context";
import { AlarmProvider } from "@/contexts/alarm.context";
import ConfigurationProvider from "@/contexts/configuration.context";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <ConfigurationProvider>
        <AlarmProvider>
          <PomodoroProvider>
            <Title />
            <Favicon />
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header />
                {children}
              </ThemeProvider>
            </body>
          </PomodoroProvider>
        </AlarmProvider>
      </ConfigurationProvider>
    </html>
  );
}
