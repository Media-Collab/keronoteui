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
    <Stack component="div" width={"300px"} sx={{ margin: 1 }}>
      <section
        key={tool.name}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: "5px",
          border: "1px solid #c4c4c4",
          padding: "1rem",
        }}
      >
        <Icon path={tool.icon} size={1} />
        <span style={{ fontWeight: "bold", width: "5rem" }}>{tool.name}</span>
        <p style={{ width: "10rem" }}>{tool.description}</p>
      </section>
    </Stack>
  );
};

export default Tools;
