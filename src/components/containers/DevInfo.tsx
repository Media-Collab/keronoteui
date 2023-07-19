import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";
import { Stack, Typography } from "@mui/material";

interface ItemProps {
  data: {
    developer: string;
    uri: string;
    occupation: string;
  };
}

const DevInfo: React.FC<ItemProps> = ({ data }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        "& > :not(style)": {
          m: 1,
          width: "fit-content",
          height: "1rem",
          borderRadius: "50%",
          alignItems: "start",
          justifyContent: "center",
        },
        cursor: "pointer",
        border: "1px solid #e0e0e0",
        padding: "0.5rem",
        marginBottom: 1,
      }}
      onClick={() => window.open(data.uri, "_blank")}
      width="250px"
    >
      <Icon path={mdiGithub} size={1.8} color="black" />
      <Stack direction="column" spacing={2}>
        <Typography component="p" sx={{ fontWeight: "600" }}>
          @{data.developer}
        </Typography>
        <Typography
          component="span"
          sx={{
            fontSize: "0.8rem",
            fontWeight: 100,
            margin: "0px !important",
            color: "#7b7b7b",
          }}
        >
          {data.occupation}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DevInfo;
