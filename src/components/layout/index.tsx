import React, { FC } from "react";
import { useStore } from "../../stores";
import Navbar from "./navbar";

const Layout: FC<React.PropsWithChildren> = ({ children }) => {
  const isOpen = useStore((state) => state.isOpen);
  const setIsOpen = useStore((state) => state.setOpen);

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragover") {
      if (!isOpen && e.dataTransfer.types.includes("Files")) {
        console.log("Is dragging!");
        setIsOpen(true);
      }
    }
  };

  return (
    <div>
      <div
        className="flex min-h-screen w-full flex-col px-5 py-2"
        onDragEnter={handleDragEvents}
        onDragLeave={handleDragEvents}
        onDragOver={handleDragEvents}
      >
        <Navbar />
        <main className="container flex h-full w-full flex-col items-center justify-start ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
