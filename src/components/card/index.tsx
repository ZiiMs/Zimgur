import React from "react";
import NoDragImage from "../noDragImage";

interface ICard {
  src: string;
}

const ImageCard: React.FC<ICard> = ({src}) => {
  return (
    <div>
      <NoDragImage
        src={src}
        alt={``}
        width={0}
        sizes={"100vw"}
        height={0}
        className={"h-fit w-[300px] break-inside-avoid"}
      />
    </div>
  );
};

export default ImageCard;
