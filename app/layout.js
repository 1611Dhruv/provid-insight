import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { MantineProvider, createTheme } from "@mantine/core";

export const metadata = {
  title: "ProVid Insight",
  description: "Embark on a presentation journey",
};

export default function RootLayout({ children }) {
  const theme = createTheme({
    fontFamily: "Open Sans, sans-serif",
    primaryColor: "cyan",
  });
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-slate-50 to-slate-200 min-w-screen min-h-screen">
        <MantineProvider theme={theme}>
          <UserProvider>
            <Navbar />
            {children}
          </UserProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
