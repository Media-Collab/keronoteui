import { MuiListInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { Fab } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Item from "@components/containers/Item";
// get data
import { useList, HttpError } from "@refinedev/core";

interface IAnimations {
  id: number;
  title: string;
  thumbnail: string;
  username: string;
  likes: number;
}

export default function BlogPostList() {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const { data, isLoading, isError } = useList<IAnimations, HttpError>({
    resource: "animation_list",
  });

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      // Simulación de datos de items para mostrar en el ejemplo
      const data: string[] = ["Item 1"];

      setItems((prevItems: any) => [...prevItems, ...data]);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchItems();
  }, [page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight * 0.8 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const animations = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ m: 3, fontWeight: "bold" }}
      >
        Popular ^ w ^
      </Typography>
      <Stack
        component="div"
        display="flex"
        direction={{ xs: "column", sm: "row" }}
        flexWrap="wrap"
        justifyContent="space-around"
        alignItems="center"
        width={"100%"}
      >
        {/* {animations.map((animation) => (
          <>
            <p>{JSON.stringify(animation)}</p>
          </>
        ))} */}
        {animations.map((animation: any) => (
          <Item content={animation} currentPage={page} />
        ))}
        {loading && <p>Loading...</p>}
      </Stack>
      <FloatingButton>{page}</FloatingButton>
    </Box>
  );
}

const FloatingButton = ({ children }: any) => {
  return (
    <Fab
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "#f50057",
        color: "#fff",
      }}
    >
      <Typography variant="body1">{children}</Typography>
    </Fab>
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
        destination: `${redirectTo}?to=${encodeURIComponent("/blog-posts")}`,
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

/* import { MuiListInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";

export default function BlogPostList() {
  return <MuiListInferencer />;
}

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
        destination: `${redirectTo}?to=${encodeURIComponent("/blog-posts")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
}; */
