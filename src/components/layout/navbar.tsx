import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useStore } from "../../stores";
import UploadImage from "../modals/uploadImage";
import NoDragImage from "../noDragImage";

const Navbar: React.FC = () => {
  const isOpen = useStore((state) => state.isOpen);
  const setIsOpen = useStore((state) => state.setOpen);

  const { data: session, status } = useSession();

  return (
    <>
      <div className="fixed z-20 flex w-full flex-row items-center justify-between bg-zimgur-900 bg-opacity-95 px-5 py-4">
        <div className="flex flex-row items-center justify-center space-x-4">
          <Link href={"/"}>
            <button className="flex items-center">
              <NoDragImage
                src={"/images/ziimgur.svg"}
                alt={""}
                height={30}
                width={109}
              />
            </button>
          </Link>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="flex flex-row items-center space-x-1 rounded bg-gradient-to-l from-blue-500 to-[#049F7A] p-2 hover:animate-grow hover:ring-1 hover:ring-blue-500 focus:scale-[1.05] focus:ring-1"
          >
            <span>New Image</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-circle-plus"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <circle cx={12} cy={12} r={9}></circle>
              <line x1={9} y1={12} x2={15} y2={12}></line>
              <line x1={12} y1={9} x2={12} y2={15}></line>
            </svg>
          </button>
        </div>
        {status === "authenticated" ? (
          <Link href={`/profile/${session?.user?.id}`}>
            <button className="flex items-center">
              <span className="outline-solid h-[38px] w-[38px] items-center rounded-full outline outline-2 outline-blue-500">
                {session?.user?.image ? (
                  <Image
                    className="rounded-full "
                    src={session.user.image}
                    width={40}
                    height={40}
                    alt={session.user.name ?? ""}
                  />
                ) : (
                  <span>{session?.user?.name}</span>
                )}
              </span>
            </button>
          </Link>
        ) : (
          <button
            onClick={() => {
              signIn();
            }}
            className="rounded bg-blue-500 p-2 text-base font-bold hover:animate-grow hover:ring-1 hover:ring-blue-500 focus:scale-[1.05] focus:ring-1"
          >
            Sign In
          </button>
        )}
      </div>
      <UploadImage
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default Navbar;
