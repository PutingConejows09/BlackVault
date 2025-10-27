"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import GlobalBackgroundMusic from "./components/GlobalBackgroundMusic";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/" && pathname !== "/login";

  return (
    <>
      {/* Global Background GIF */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/ABOUT US/about-us-bg.gif')",
            opacity: 0.8,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Global Background Music */}
      <GlobalBackgroundMusic />

      {/* Show Navbar on all pages except home and login */}
      {showNavbar && <Navbar />}

      {/* Main Content */}
      <div className={`relative z-10 ${showNavbar ? "pt-16" : ""}`}>
        {children}
      </div>
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}