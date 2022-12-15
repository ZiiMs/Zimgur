import { trpc } from "@/utils/trpc";
import clsx from "clsx";
import React from "react";

const FavoriteButton: React.FC<{ id: string }> = ({ id }) => {
  const client = trpc.useContext();

  const { mutate: addToFavorites, status: addFavoriteStatus } =
    trpc.favorite.add.useMutation({
      onSuccess: (data) => {
        console.log("Successfully added to favorites", data);
        client.favorite.check.invalidate({ id: id });
      },
    });

  const { mutate: deleteFavorite, status: deleteFavoriteStatus } =
    trpc.favorite.delete.useMutation({
      onSuccess: (data) => {
        console.log("Successfully deleted from favorites", data);
        client.favorite.check.invalidate({ id: id });
      },
    });

  const { data: isFavorite } = trpc.favorite.check.useQuery({ id: id });

  return (
    <button
      id={"FavoriteButton"}
      className={clsx(
        "rounded-lg border-2 border-solid border-zimgur-200 bg-zimgur-300 p-2 ",
        isFavorite
          ? "fill-red-600 text-red-600"
          : "fill-none hover:text-red-600"
      )}
      onClick={(e) => {
        e.preventDefault();
        if (
          addFavoriteStatus !== "loading" &&
          deleteFavoriteStatus !== "loading"
        ) {
          if (!isFavorite) {
            addToFavorites({ id: id });
          } else if (isFavorite) {
            deleteFavorite({
              id: id,
            });
          }
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-heart"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
      </svg>
    </button>
  );
};

export default FavoriteButton;
