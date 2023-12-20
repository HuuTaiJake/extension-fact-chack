import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
// import "@/styles/main.css";
import React from "react";
import { Providers } from "../../providers";

const ExtensionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default ExtensionLayout;
