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
} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Layer from "@components/containers/Layer";

const Canvas = () => {
  const [nameLayer, setNameLayer] = useState("");
  //   const [dimensions, setDimensions] = useState("1280*720")

  const nombre = () => {
    setNameLayer(nameLayer);
  };

  return (
    <Stack
      sx={{
        backgroundColor: "#AED3F7",
        height: "530px",
        display: "grid",
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
      }}
    >
      {/* brush section */}
      <section
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#BFDBFE",
          gridColumn: "span 1",
          margin: "1rem",
          borderRadius: "1rem",
          boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
        }}
      >
        <div
          style={{
            padding: "4px",
            borderRadius: "lg",
            boxShadow: "xl",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <BrushOutlined />
          <RemoveOutlined />
          <UndoOutlined />
          <RedoOutlined />
          <TextureOutlined />
          <GroupWorkOutlined />
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
        }}
      >
        <canvas
          id="keronote"
          style={{
            margin: " 1rem",
            backgroundColor: " rgb(255, 255, 255)",
            width: " 90%",
            height: " 90%",
            overflow: "auto",
          }}
        ></canvas>
        {/* <div
          style={{
            width: "96px",
            backgroundColor: "#BFDBFE",
            boxShadow: "xl",
            padding: "2px",
            borderRadius: "lg",
          }}
        >

        </div> */}
        <div style={{ display: "flex" }}>
          <ArrowBackOutlined />
          <PauseOutlined style={{ marginLeft: "2px", marginRight: "2px" }} />
          <PlayArrowOutlined style={{ marginRight: "1px" }} />
          <StopOutlined style={{ marginRight: "2px" }} />
          <ArrowForwardOutlined />
        </div>
      </section>
      {/* layer view */}
      <section
        style={{
          gridColumn: "span 2",
        }}
      >
        {/* layers active */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#BFDBFE",
            borderRadius: "1rem",
            margin: "1rem",
            justifyContent: "space-between",
            boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
            
          }}
        >
          <section
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              // height: "30vw",

              overflow: "auto",
              padding: "7px",
            }}
          >
            <Layer nameLayer="Layer 1" />
            <Layer nameLayer="Layer 2" />
            <Layer nameLayer="Layer 3" />
            <Layer nameLayer="Layer 4" />
            <Layer nameLayer="Layer 5" />
            <Layer nameLayer="Layer 6" />
            <Layer nameLayer="Layer 7" />
            <Layer nameLayer="Layer 8" />
            <Layer nameLayer="Layer 9" />
          </section>
        </section>
        {/* layers controller */}
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#BFDBFE",
            borderRadius: "1rem",
            padding: "5px 0px",
            justifyContent: "space-evenly",
            width: "88%",
            alignItems: "center",
            margin: "auto",
            boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
          }}
        >
          <AddOutlined sx={{ cursor: "pointer" }} />
          <ContentCopyOutlined sx={{ cursor: "pointer" }} />
          <DeleteOutlined sx={{ cursor: "pointer" }} />
        </section>
      </section>
    </Stack>
  );
};

export default Canvas;
