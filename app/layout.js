import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/footer";
import { GlobalProvider } from "@/contexts/globalContext";
import Authbar from "@/components/authbar";

export const metadata = {
  title: "Newstart Health App",
  description: "Capture, Track and Report on your health metrics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="vh-100 d-flex flex-column">
        <GlobalProvider>
          <Authbar />
          <Navbar />
          {children}
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
