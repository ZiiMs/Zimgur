import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
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
      <section className=" z-50 h-full w-full max-w-[90%] animate-enter items-center justify-center rounded-lg bg-zimgur-700 p-2 ring-1 ring-zimgur-100/60">
        <div id="TopImageBar" className="flex flex-row justify-between">
          <div className="flex flex-row  gap-x-2">
            <Image
              src={data.Owner.image ?? ""}
              layout={"fixed"}
              alt={""}
              width={42}
              height={42}
              className={"rounded-full"}
            />
            <div className="flex flex-col items-start justify-start gap-0 space-y-0">
              <span className="text-lg font-bold text-white">
                {data.Owner.name}
              </span>
              <span className="text-sm font-thin leading-4 text-white/40">
                {data.createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex space-x-2 text-white">
            <button className="rounded-lg border-2 border-solid border-zimgur-200 bg-zimgur-300 p-2 hover:text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </button>
            <button className="rounded-lg border-2 border-solid border-zimgur-200 bg-zimgur-300 p-2 hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <button className="flex items-center justify-center space-x-2  rounded-lg border border-solid border-zimgur-300 bg-blue-500 hover:bg-blue-600 p-2">
              <span className="flex gap-2 font-medium">
                <span className="text-lg">Download</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </span>
            </button>
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
