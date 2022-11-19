import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import NoDragImage from "../noDragImage";

interface ICard {
  Owner: User;
  type: string;
  id: string;
  extension: string;
  name: string | null;
  createdAt: Date;
  src: string;
  OnClick: (data: {
    Owner: User;
    name: string | null;
    createdAt: Date;
    src: string;
  }) => void;
}

const ImageCard: React.FC<ICard> = ({
  src,
  Owner,
  OnClick,
  name,
  createdAt,
}) => {
  return (
    <div
      className="group relative z-10 flex hover:cursor-zoom-in"
      onClick={(e) => {
        e.preventDefault();
        OnClick({ Owner, name, createdAt, src });
        console.log("Open Image Modal");
      }}
    >
      <NoDragImage
        src={src}
        alt={``}
        width={0}
        sizes={"100vw"}
        height={0}
        className={
          "h-fit w-[300px] transition-all duration-150 group-hover:brightness-[.70] group-hover:ease-in-out"
        }
      />
      <div className="invisible absolute bottom-0 left-0 w-full px-3 py-2 hover:visible group-hover:visible transition-all duration-150 group-hover:ease-in-out ">
        <div className="flex w-full items-center justify-between">
          <span className="flex">
            {Owner.image ? (
              <Image
                className="rounded-full "
                src={Owner.image}
                width={26}
                height={26}
                alt={Owner.name ?? ""}
              />
            ) : null}
            <span className="flex px-2">
              {Owner.name}
              {name ? `- ${name}` : ""}
            </span>
          </span>
          <span>{createdAt.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
