import Link from "next/link";
import React from "react";

const DownloadButton: React.FC<{ src: string }> = ({ src }) => {



  return (
    <Link href={src} passHref>
      <button className="flex items-center justify-center space-x-2  rounded-lg border border-solid border-zimgur-300 bg-blue-500 p-2 hover:bg-blue-600 disabled:bg-red-500/50">
        <span className="flex gap-1 font-medium">
          <span className="text-lg">Download</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-download"
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
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
            <polyline points="7 11 12 16 17 11"></polyline>
            <line x1={12} y1={4} x2={12} y2={16}></line>
          </svg>
        </span>
      </button>
    </Link>
  );
};

export default DownloadButton;
