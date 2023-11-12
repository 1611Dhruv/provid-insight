import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "ProVid Insight",
  description: "Embark on a presentation journey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-slate-50 to-slate-200 min-w-screen min-h-screen">
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
