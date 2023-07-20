import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { authProvider } from "src/authProvider";

import { AppIcon } from "src/components/app-icon";

import Image from "next/image";

import bgImg from "./assets/bg.jpg";

import { useMediaQuery } from "@mui/material";
export default function Register() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <div
      style={{
        display: isMobile ? "block" : "grid",
        placeItems: "start",
        overflow: "hidden",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <AuthPage
          type="register"
          title={
            <ThemedTitleV2
              collapsed={false}
              text="Keronote_ui"
              icon={<AppIcon />}
            />
          }
        />
      </div>
      <Image
        src={bgImg}
        alt="bg"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: isMobile ? "none" : "block",
        }}
      />
    </div>
  );
}

Register.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: `/`,
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
