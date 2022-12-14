import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { trpc } from "../../utils/trpc";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

const UploadImage: React.FC<IModal> = ({ isOpen, onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const client = trpc.useContext();

  const { mutate: uploadImage, status } = trpc.images.create.useMutation({
    onSuccess: async (data) => {
      console.log("Success", data);
      const imgGetall = client.images.getAll.invalidate();
      const userGetall = client.user.getAll.invalidate();
      await Promise.all([imgGetall, userGetall]);
      setImage(null);
      setIsDragging(false);
      setUrl("");
      onClose();
    },
  });

  const upload = useCallback(
    (
      img: Uint8Array | string,
      isUrl = false,
      type: undefined | string = undefined
    ) => {
      if (typeof img === "string") {
        console.log("String!?");
        uploadImage({ image: img, isURL: isUrl });

        return;
      } else if (image) {
        const size = image.size / 1024;
        console.log(size);
        console.log("Not String", img, type, isUrl);

        uploadImage({ image: img, type: type });
      }
    },
    [image, uploadImage]
  );

  useEffect(() => {
    const getData = async () => {
      if (image) {
        const size = image.size / 1024;
        console.log(size);
        if (size >= 4096) {
          console.log("Error, image to large");
          return;
        }
        const foundText = await image.arrayBuffer();
        console.log("NewSize", foundText.byteLength / 1024);
        const uint = new Uint8Array(foundText);
        console.log("BlogStringw", uint.length / 1024);

        upload(uint, false, image.type);
        setImage(null);
        setIsDragging(false);
      }
    };

    getData();
  }, [uploadImage, image, upload]);

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
        isOpen ? "fixed" : "hidden",
        "inset-0 z-20 m-auto flex h-full w-full items-center justify-center "
      )}
    >
      <div
        className="absolute inset-0 h-full w-full animate-modelBackdrop bg-zimgur-700 bg-opacity-20 backdrop-blur-sm   "
        onClick={onClose}
      />
      <section className=" w-fit min-w-[12rem] animate-enter rounded-lg bg-zimgur-700 ring-1 ring-zimgur-100/60">
        {status === "loading" ? (
          <div className="flex h-96 w-96 flex-row items-center justify-center">
            <div className="absolute right-1/2 bottom-1/2  translate-x-1/2 translate-y-1/2 transform ">
              <div className="h-32 w-32 animate-spin  rounded-full border-8 border-solid border-zimgur-50 border-t-transparent"></div>
            </div>
          </div>
        ) : (
          <div
            className="flex h-96 w-96 flex-col"
            onDragEnter={handleDragEvents}
          >
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
                <span className="flex flex-row p-4 text-sm font-bold">OR</span>
                <div className="flex w-full items-center justify-center">
                  <input
                    className="rounded bg-zimgur-900 py-1 px-2 outline outline-1 outline-zimgur-50"
                    placeholder="Paste URL here"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    onPaste={(e) => {
                      const isURL = z
                        .string()
                        .url()
                        .safeParse(e.clipboardData.getData("Text"));
                      if (isURL.success) {
                        setUrl(isURL.data);
                        upload(isURL.data, true);
                      } else {
                        alert("Error invalid URL");
                      }
                    }}
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    value={url}
                  />
                </div>
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
        )}
      </section>
    </div>
  );
};
export default UploadImage;
