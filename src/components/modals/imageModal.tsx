import { User } from "@prisma/client";
import clsx from "clsx";
import React from "react";
import { z } from "zod";
import NoDragImage from "../noDragImage";

interface IModal {
  isOpen: boolean;
  data: {
    Owner: User;
    name: string | null;
    createdAt: Date;
    src: string;
  } | null;
  onClose: () => void;
}

const ImageModal: React.FC<IModal> = ({ isOpen, onClose, data }) => {
  if (!data) return null;

  return (
    <dialog
      className={clsx(
        isOpen ? "fixed" : "hidden",
        "inset-0 z-20 m-auto flex h-full w-full items-center justify-center bg-transparent "
      )}
    >
      <div
        className="absolute inset-0 h-full w-full animate-modelBackdrop bg-zimgur-700 bg-opacity-20 backdrop-blur-sm   "
        onClick={onClose}
      />
      <section className="z-50  w-fit min-w-[12rem] animate-enter rounded-lg bg-zimgur-700 ring-1 ring-zimgur-100/60">
        <div className="p-2">
          <NoDragImage
            src={data.src}
            alt={``}
            width={0}
            sizes={"100vw"}
            height={0}
            className={
              "h-fit w-[600px] max-h-full transition-all duration-150 group-hover:brightness-[.70] group-hover:ease-in-out"
            }
          />
        </div>
      </section>
    </dialog>
  );
};

export default ImageModal;
