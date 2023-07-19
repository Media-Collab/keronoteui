"use client";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { useList, useCreate, HttpError, BaseKey } from "@refinedev/core";

interface IAnimations {
  id: number;
  title: string;
  thumbnail: string;
  username: string;
  likes: number;
}

const ProductList: React.FC = () => {
  
  const [file, setFile] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState(null);
  /* const { mutate } = useCreate();

  mutate({
    resource: "products",
    values: {
      name: "New Product",
      material: "Wood",
    },
  }); */

  const { data, isLoading, isError } = useList<IAnimations, HttpError>({
    resource: "animation_list",
  });

  const animations = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }


  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const { fileUrl } = await res.json();
      setFileUrl(fileUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {animations.map((animation) => (
        <>
          <p>{JSON.stringify(animation)}</p>
          <form onSubmit={handleSubmit}>
            <input type="file" name="file" onChange={handleFileChange} />
            <button type="submit">Submit</button>
          </form>
          {fileUrl && (
            <>
              <p>
                <img src={fileUrl} alt="Uploaded image" />
              </p>
              <p>{fileUrl}</p>
            </>
          )}
        </>
      ))}
    </ul>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/test")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};

export default ProductList;
