import Icon from "@mdi/react";
import { Stack } from "@mui/material";

interface ItemProps {
  tool: {
    name: string;
    icon: string;
    description: string;
  };
}

const Tools: React.FC<ItemProps> = ({ tool }) => {
  return (
    <Stack component="div" width={"220px"} sx={{ margin: 1 }}>
      <section
        key={tool.name}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Icon path={tool.icon} size={1} color="#fff" />
        <span style={{ fontWeight: "bold" }}>{tool.name}:</span>
        <p>{tool.description}</p>
      </section>
    </Stack>
  );
};

export default Tools;
