import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

const UploadImage: React.FC<IModal> = ({ isOpen, onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [uint8ArrayImage, setUint8Array] = useState<Uint8Array | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { mutate: UploadImage } = trpc.images.create.useMutation();
  const { mutate: UploadFromURL } = trpc.images.create2.useMutation();

  useEffect(() => {
    const getData = async () => {
      if (image) {
        const foundText = await image.arrayBuffer();
        const uint = new Uint8Array(foundText);
        setUint8Array(uint);

        console.log("BlogString", uint);
      } else {
        setUint8Array(null);
      }
    };

    getData()
      .then((e) => {
        console.log("E", e);
      })
      .catch((err) => {
        console.error("Err", err);
      });
  }, [image]);

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  return (
    <div
      className={clsx(
        isOpen ? "block " : "hidden",
        "fixed inset-0 z-40 m-auto flex h-full w-full items-center justify-center "
      )}
    >
      <div
        className="bg-rad-black-900 absolute inset-0 h-full w-full animate-modelBackdrop bg-opacity-20 backdrop-blur-sm   "
        onClick={onClose}
      />
      <section className="z-50  w-fit min-w-[12rem] animate-enter rounded-lg bg-zimgur-700 ring-1 ring-zimgur-100/60">
        <div className="flex h-96 w-96 flex-col" onDragEnter={handleDragEvents}>
          <label
            className=" h-full w-full items-center justify-center bg-transparent "
            htmlFor="FileInput"
          >
            <input
              id={"FileInput"}
              hidden
              type={"file"}
              name=""
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
            <div className="flex h-full  flex-col items-center justify-center">
              <h1 className="rounded p-6 text-lg font-bold outline-dashed outline-4 outline-zimgur-100">
                Drop images here
              </h1>
            </div>
          </label>
          {isDragging && (
            <div
              className="absolute top-0 left-0 right-0 bottom-0 h-full w-full"
              onDragEnter={handleDragEvents}
              onDragLeave={handleDragEvents}
              onDragOver={handleDragEvents}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  console.log(e.dataTransfer.files[0]);
                  setImage(e.dataTransfer.files[0]);
                }
                console.log("Handle Drop!", e);
              }}
            ></div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UploadImage;