import { trpc } from "@/utils/trpc";
import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import CollectionButton from "../buttons/collectionButton";
import DownloadButton from "../buttons/downloadButton";
import FavoriteButton from "../buttons/favoriteButton";
import NoDragImage from "../noDragImage";

interface IModal {
  isOpen: boolean;
  data: {
    Owner: User;
    id: string;
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
      <section className=" z-50 flex h-full w-full max-w-[90%] animate-enter flex-col items-center justify-start rounded-lg bg-zimgur-700 p-2 ring-1 ring-zimgur-100/60">
        <div
          id="TopImageBar"
          className="flex h-fit w-full flex-row justify-between"
        >
          <div className="flex flex-row gap-x-2">
            <NoDragImage
              src={data.Owner.image ?? ""}
              alt={""}
              width={44}
              height={44}
              className={"rounded-full"}
            />
            <div className="flex flex-col items-start justify-start gap-0 space-y-0">
              <span className="text-lg font-bold text-white">
                {data.Owner.name}
              </span>
              <span className="text-sm font-thin leading-3 text-white/40">
                {data.createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex space-x-2 text-white">
            <FavoriteButton id={data.id} />
            <CollectionButton id={data.id} />
            <DownloadButton src={data.src} />
          </div>
        </div>
        <div className="flex h-full max-h-[90%] w-full max-w-[90%] items-center justify-center p-4">
          <div className="relative h-full w-full">
            <NoDragImage
              fill
              src={data.src}
              alt={``}
              sizes={"100vw"}
              className={"object-contain"}
            />
          </div>
        </div>
      </section>
    </dialog>
  );
};

export default ImageModal;
