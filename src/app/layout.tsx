import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainSidebar } from "@/components/layout/main-sidebar";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clinic Management System - Beauty Clinic",
  description: "Comprehensive management system for beauty and aesthetic clinic operations",
  keywords: "clinic, management, beauty, aesthetic, patient, booking, inventory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <MainSidebar />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header />
            
            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-white">
              <div className="p-6">
                {children}
              </div>
            </main>
          </div>
        </div>
        
        {/* Toast Notifications */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}