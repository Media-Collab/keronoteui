import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Box, Stack, Divider } from "@mui/material";
import Item from "@components/containers/Item";
import DevInfo from "@components/containers/DevInfo";
import toolsInfo from "@components/kero/toolsInfo";
import Tools from "@components/containers/Tools";
// get data
import { useList, HttpError } from "@refinedev/core";

interface IAnimations {
  id: number;
  title: string;
  thumbnail: string;
  kerofile: string;
  username: string;
  likes: number;
}

const Profile = () => {
  const { data, isLoading, isError } = useList<IAnimations, HttpError>({
    resource: "animation_list",
  });

  const devs = [
    {
      id: 1,
      developer: "mrgaturus",
      occupation: "Canvas logic | Backend",
      uri: "https://github.com/mrgaturus/",
    },
    {
      id: 2,
      developer: "JuanViverosDev",
      occupation: "Frontend | Responsive",
      uri: "https://github.com/JuanViverosDev",
    },
    {
      id: 2,
      developer: "gregoryInnovo",
      occupation: "Frontend | Cloudinary API",
      uri: "https://github.com/gregoryInnovo/",
    },
  ];

  const animations = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <section>
      <Divider textAlign="left">
        <h3>Keronote</h3>
      </Divider>
      <p>
        we love flipnote animations, but the main problem is you need a nintendo
        ds for create those animations. So we tried to do a simple animation
        software having inspiration on those features from flipnote studio but
        at the same time improving and adding more features like layer system
        and extended color palette How i built it: we used refine for easily
        store animation information and we made a handmade canvas lib called
        "keronote", this project is also the frontend for that lib. Concept by:
        @mrgaturus
      </p>

      <Divider textAlign="left">
        <h3>How Canvas Works?</h3>
      </Divider>
      <Stack
        component="div"
        display="flex"
        direction={{ xs: "row", sm: "row" }}
        flexWrap="wrap"
        justifyContent="space-around"
        alignItems="center"
        width={"100%"}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {toolsInfo.map((tool: any) => (
            <Tools tool={tool} />
          ))}
        </Box>
      </Stack>

      <Divider textAlign="left">
        <h3>Your favorites (soon...)</h3>
      </Divider>
      <Box sx={{ width: "100%" }}>
        <Stack
          component="div"
          display="flex"
          direction={{ xs: "column", sm: "row" }}
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="center"
          width={"100%"}
        >
          {animations.map((animation: any) => (
            <Item content={animation} currentPage={1} />
          ))}
        </Stack>
      </Box>

      <Divider textAlign="left">
        <h3>Developers</h3>
      </Divider>
      <Stack
        component="div"
        display="flex"
        direction={{ xs: "column", sm: "row" }}
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        width={"100%"}
      >
        {devs.map((dev: any) => (
          <DevInfo data={dev} />
        ))}
      </Stack>
    </section>
  );
};

export default Profile;

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
        destination: `${redirectTo}?to=${encodeURIComponent("/profile")}`,
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
