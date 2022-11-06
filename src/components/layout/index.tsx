import React, { FC } from "react";
import Navbar from "./navbar";

const Layout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <div className="flex min-h-screen w-full flex-col px-5 py-2">
        <Navbar />
        <main className="container flex h-full w-full flex-col items-center justify-start ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
