import { ToastContainer } from "react-toastify";
import { roboto, ubuntu } from "./font";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Dashboard | Home",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${ubuntu.variable} bg-hero-pattern`}>
        {children}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          pauseOnHover
        />
      </body>
    </html>
  );
}
