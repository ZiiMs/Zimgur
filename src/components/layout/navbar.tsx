import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useStore } from "../../stores";
import UploadImage from "../modals/uploadImage";
import NoDragImage from "../noDragImage";

const Navbar: React.FC = () => {
  const isOpen = useStore((state) => state.isOpen);
  const setIsOpen = useStore((state) => state.setOpen);

  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      <div className="fixed flex w-full flex-row items-center justify-between bg-zimgur-900 bg-opacity-95 px-5 py-4">
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
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clipRule="evenodd"
              />
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
