import Image, { ImageProps } from "next/future/image";
import React from "react";

const NoDragImage: React.FC<ImageProps> = ({ ...props }) => {
  return Image({
    ...props,
    onDragStart: (e) => {
      for (let i = 0, item; (item = e.dataTransfer.items[i]); i++) {
        if (item.kind === "file") {
          e.dataTransfer.items.remove(i);
          console.log("Removing File");
          break;
        }
      }
    },
  });
};

export default NoDragImage;
