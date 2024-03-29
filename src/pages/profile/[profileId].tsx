import Layout from "@/components/layout";
import LayoutWrapper from "@/components/layout/layoutWrapper";
import Navbar from "@/components/layout/navbar";
import NoDragImage from "@/components/noDragImage";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";

const Home: NextPageWithLayout = () => {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const { profileId } = router.query;
  const { data: session } = useSession({
    onUnauthenticated: () => {
      router.push("/");
    },
    required: true,
  });

  const { data: images } = trpc.user.getAll.useQuery(
    { id: profileId as string },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  if (url === "") {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {session?.user?.name ? `${session?.user?.name} - Profile` : ""}
        </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="columns-5 space-y-4">
        {images && url !== ""
          ? images.map((img, i) => {
              return (
                <div key={i}>
                  <NoDragImage
                    src={`${url}/api/${img.id}.${img.extension}`}
                    alt={``}
                    width={0}
                    sizes={"100vw"}
                    height={0}
                    className={"h-auto w-[300px]"}
                  />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Navbar />
      <LayoutWrapper>{page}</LayoutWrapper>
    </Layout>
  );
};

export default Home;
