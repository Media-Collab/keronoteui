import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { useList, useCreate, HttpError, BaseKey } from "@refinedev/core";

interface IAnimations {
  id: number;
  user: BaseKey;
  thumbnail: string;
  title: string;
}

const ProductList: React.FC = () => {
  /* const { mutate } = useCreate();

  mutate({
    resource: "products",
    values: {
      name: "New Product",
      material: "Wood",
    },
  }); */

  const { data, isLoading, isError } = useList<IAnimations, HttpError>({
    resource: "animations", 
    meta: {
      select: "*, profiles(*)"
    }
  });

  const animations = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <ul>
      {animations.map((animation) => (
        <>
          <p>{JSON.stringify(animation)}</p>
          <p>{animation.user}</p>
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
