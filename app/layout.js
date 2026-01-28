import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "One-Up",
  description: "AI-powered profile & career intelligence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
