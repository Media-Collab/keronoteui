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
  const [layers, setLayers] = useState([
    {
      id: 1,
      name: "Layer 1",
      isSelect: true,
    },
  ]);

  const alertEvent = (e: any) => {
    alert(e.target);
  };

  const addLayer = () => {
    const newLayer = {
      id: layers.length + 1,
      name: `Layer ${layers.length + 1}`,
      isSelect: false,
    };
    setLayers([...layers, newLayer]);
  };

  const removeLayer = () => {
    const layersToKeep = layers.filter((layer) => layer.isSelect === false);
    setLayers(layersToKeep);
  };

  const copyLayer = () => {
    const selectedLayer = layers.filter((layer) => layer.isSelect === true);
    const newLayer = {
      id: selectedLayer[0].id + 1,
      name: selectedLayer[0].name + " copy",
      isSelect: false,
    };
    setLayers([...layers, newLayer]);
  };

  console.log("layers", layers);

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
          maxHeight: breakPoint ? "506px" : "184px",

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
            overflow: "auto",
            borderRadius: "1rem",
          }}
          // Guarda una proporción de 16:9 para el canvas y que se adapte al tamaño de la pantalla de acuerdo al breakpoint
          width={breakPoint ? 900 : 300}
          height={breakPoint ? 506 : 184}
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
              overflow: "auto",
              gap: breakPoint ? "1rem" : "0.5rem",
              borderRadius: "1rem",
              // El max-height es el tamaño del canvas
              maxHeight: breakPoint ? "506px" : "184px",
            }}
          >
            {layers.map((layer, index) => (
              <div
                onDoubleClick={(e) => {
                  setLayers(
                    layers.map((layer, i) => {
                      if (i === index) {
                        layer.isSelect = !layer.isSelect;
                      }
                      return layer;
                    })
                  );
                }}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", index);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  const from = e.dataTransfer.getData("text/plain");
                  const to = index;
                  const newLayers = layers.slice();
                  newLayers.splice(to, 0, newLayers.splice(from, 1)[0]);
                  setLayers(newLayers);
                }}
              >
                <Layer layer={layer} layers={layers} setLayers={setLayers} />
              </div>
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
            boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
            gap: "1rem",
          }}
        >
          <div
            onClick={(e) => {
              addLayer();
            }}
          >
            <Add sx={{ cursor: "pointer" }} />
          </div>
          <div onClick={(e) => copyLayer()}>
            <ContentCopy sx={{ cursor: "pointer" }} />
          </div>
          <div
            onClick={(e) => {
              removeLayer();
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
