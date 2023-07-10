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

export default function BlogPostList() {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      // Simulación de datos de items para mostrar en el ejemplo
      const data: string[] = [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
        "Item 7",
        "Item 8",
        "Item 9",
        "Item 10",
      ];

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
        {items.map((item, index) => (
          <Item key={index} content={item} currentPage={page} />
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
