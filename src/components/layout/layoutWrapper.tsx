import React, { FC } from "react";

const LayoutWrapper: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className="container flex h-full w-full flex-col items-center justify-start pt-20">
      {children}
    </main>
  );
};

export default LayoutWrapper;
