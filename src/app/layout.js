import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import GlobalWarningMessage from "@/components/GlobalWarningMessage/GlobalWarningMessage";
import AuthProvider from "@/Context/AuthProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Docify | Home",
  description: "Best document editor ever",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthProvider>
          <GlobalWarningMessage></GlobalWarningMessage>
          <NavBar></NavBar>
          <main className="ms-[56px]">{children}</main>
          <ToastContainer></ToastContainer>
        </AuthProvider>
      </body>
    </html>
  );
}
