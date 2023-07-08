"use client";
import { useEffect, useRef, useState } from "react";
// icons https://mui.com/material-ui/material-icons/?theme=Outlined&query=delete
import {
  BrushOutlined,
  ContentCopyOutlined,
  RemoveOutlined,
  TextureOutlined,
  GroupWorkOutlined,
  UndoOutlined,
  RedoOutlined,
  AddOutlined,
  ArrowBackOutlined,
  PauseOutlined,
  PlayArrowOutlined,
  StopOutlined,
  ArrowForwardOutlined,
  DeleteOutlined,
  Brush,
  Remove,
  Undo,
  Redo,
  Texture,
  GroupWork,
  ArrowBack,
  Pause,
  PlayArrow,
  Stop,
  ArrowForward,
  Add,
  ContentCopy,
  Delete,
} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Layer from "@components/containers/Layer";
import { useMediaQuery } from "@mui/material";

const Canvas = () => {
  const breakPoint = useMediaQuery("(min-width:900px)");
  const [nameLayer, setNameLayer] = useState("");
  //   const [dimensions, setDimensions] = useState("1280*720")
  const [layers, setLayers] = useState([{}]);

  const nombre = () => {
    setNameLayer(nameLayer);
  };

  const alertEvent = (e: any) => {
    alert(e.target);
  };

  return (
    <Stack
      sx={{
        backgroundColor: "#AED3F7",
        height: "100%",
        gap: "1rem",
        padding: "1rem",
        "@media (min-width: 900px)": {
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        },
      }}
    >
      {/* brush section */}
      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#BFDBFE",
          gridColumn: "span 1",
          borderRadius: "1rem",
          boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
        }}
      >
        <div
          style={{
            padding: "10px",
            borderRadius: "lg",
            boxShadow: "xl",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: breakPoint ? "column" : "row",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div onClick={(e) => alertEvent(e)}>
            <Brush />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Remove />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Undo />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Redo />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Texture />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <GroupWork />
          </div>
          {/* <section
            style={{
              width: "100%",
              heigth: "1rem",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <BrushOutlined />
            <RemoveOutlined />
          </section>
          <section
            style={{
              width: "100%",
              heigth: "1rem",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <UndoOutlined />
            <RedoOutlined />
          </section>
          <section
            style={{
              width: "100%",
              heigth: "1rem",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <TextureOutlined />
            <GroupWorkOutlined />
          </section> */}
        </div>
      </section>
      {/* paint zone */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gridColumn: "span 9",
          gap: "1rem",
          height: "100%",
        }}
      >
        <canvas
          id="keronote"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            width: "100%",
            height: " 100%",
            overflow: "auto",
            borderRadius: "1rem",
          }}
        ></canvas>
        <div
          style={{
            display: "flex",
            backgroundColor: "#BFDBFE",
            borderRadius: "1rem",
            boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
            padding: "10px 10px",
          }}
        >
          <div onClick={(e) => alertEvent(e)}>
            <ArrowBack />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Pause style={{ marginLeft: "2px", marginRight: "2px" }} />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <PlayArrow style={{ marginRight: "1px" }} />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Stop style={{ marginRight: "2px" }} />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <ArrowForward />
          </div>
        </div>
      </section>
      {/* layer view */}
      <section
        style={{
          gridColumn: "span 2",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* layers active */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#BFDBFE",
            borderRadius: "1rem",
            justifyContent: "space-between",
            boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
            gap: "1rem",
            padding: "7px",
          }}
        >
          <section
            style={{
              display: "flex",
              flexDirection: breakPoint ? "column" : "row",
              // height: "30vw",
              overflow: "auto",
              gap: breakPoint ? "1rem" : "0.5rem",
              borderRadius: "1rem",
            }}
          >
            {layers.map((layer) => (
              <Layer nameLayer="Layer 1" />
            ))}
          </section>
        </section>
        {/* layers controller */}
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#BFDBFE",
            borderRadius: "1rem",
            padding: "10px",
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: "auto",
            boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
            gap: "1rem",
          }}
        >
          <div
            onClick={(e) => {
              alertEvent(e);
              setLayers([...layers, "layer"]);
            }}
          >
            <Add sx={{ cursor: "pointer" }} />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <ContentCopy sx={{ cursor: "pointer" }} />
          </div>
          <div
            onClick={(e) => {
              alertEvent(e);
              setLayers(layers.filter((layer) => layer !== "layer"));
            }}
          >
            <Delete sx={{ cursor: "pointer" }} />
          </div>
        </section>
      </section>
    </Stack>
  );
};

export default Canvas;
