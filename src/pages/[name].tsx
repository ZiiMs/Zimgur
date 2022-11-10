import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FullImage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  if (url === "") {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Image
        src={`${url}/api/${name}`}
        alt={""}
        width={0}
        sizes={"100vw"}
        height={0}
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  );
};

export default FullImage;
