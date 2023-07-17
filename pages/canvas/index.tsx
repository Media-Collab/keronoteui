"use client";
import { useKeronote } from "./hooks/keronote";
import { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Layer from "@components/containers/Layer";
import {
  Button,
  ClickAwayListener,
  Modal,
  Paper,
  Popper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Icon from "@mdi/react";
import {
  mdiEraser,
  mdiBrush,
  mdiUndo,
  mdiRedo,
  mdiSquare,
  mdiVectorCombine,
  mdiPlay,
  mdiStop,
  mdiPause,
  mdiArrowLeft,
  mdiArrowRight,
  mdiPlus,
  mdiContentDuplicate,
  mdiTrashCan,
  mdiMinus,
  mdiRectangleOutline,
  mdiCircleOutline,
  mdiRectangle,
  mdiCircle,
  mdiFormatColorFill,
  mdiContentSave,
  mdiInformation,
} from "@mdi/js";

// ---------------
// Keronote Canvas
// ---------------

// -----------------------
// Define Color Selections
// -----------------------

let colors = [
  { name: "Eraser", icon: mdiEraser, color: "#000000" },
  { name: "Black", icon: "rectangle", color: "#000000ff" },
  { name: "Gray", icon: "rectangle", color: "#7f7f7fff" },
  { name: "White", icon: "rectangle", color: "#ffffffff" },
  { name: "Red", icon: "rectangle", color: "#ff1010ff" },
  { name: "Magenta", icon: "rectangle", color: "#ec26c4ff" },
  { name: "Purple", icon: "rectangle", color: "#a037dbff" },
  { name: "Blue", icon: "rectangle", color: "#0039ceff" },
  { name: "Aqua", icon: "rectangle", color: "#14b8cdff" },
  { name: "Teal", icon: "rectangle", color: "#26d8baff" },
  { name: "Dark Green", icon: "rectangle", color: "#008431ff" },
  { name: "Light Green", icon: "rectangle", color: "#65db5dff" },
  { name: "Grass Green", icon: "rectangle", color: "#86b817ff" },
  { name: "Yellow", icon: "rectangle", color: "#ffe700ff" },
  { name: "Orange", icon: "rectangle", color: "#ff8407ff" },
  { name: "Brown", icon: "rectangle", color: "#814920ff" },
];

let tools = [
  { name: "Brush", icon: mdiBrush },
  { name: "Line", icon: mdiMinus },
  { name: "Rectangle", icon: mdiRectangleOutline },
  { name: "Circle", icon: mdiCircleOutline },
  { name: "Rectangle Fill", icon: mdiRectangle },
  { name: "Circle Fill", icon: mdiCircle },
  { name: "Bucket Fill", icon: mdiFormatColorFill },
];

const Canvas = () => {
  const canvasRef = useRef<HTMLInputElement>();
  const [selectedLayers, setSelectedLayers] = useState<number[]>([]);

  const [kero, keroActions, keroProps] = useKeronote(canvasRef);
  const breakPoint = useMediaQuery("(min-width:900px)");
  const [modal, setModal] = useState<string | boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [layers, setLayers] = useState([
    {
      id: 1,
      name: "Layer 1",
      isSelect: true,
    },
  ]);
  const [toolSelected, setToolSelected] = useState(tools[0]);
  const [colorSelected, setColorSelected] = useState(colors[0]);

  const alertEvent = (e: any) => {
    alert(e.target);
  };

  const addLayer = () => {
    if (layers.length <= 29) {
      const newLayer = {
        id: layers.length + 1,
        name: `Layer ${layers.length + 1}`,
        isSelect: false,
      };
      setLayers([...layers, newLayer]);
    } else {
      alert("You can't add more layers");
    }
  };

  const removeLayer = () => {
    const filteredLayers = layers.filter(
      (layer) => !selectedLayers.includes(layer.id)
    );
    setLayers(filteredLayers);
    setSelectedLayers([]);
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
            flexDirection: breakPoint ? "column" : "row",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => {
              setModal("tools");
              setAnchorEl(e.currentTarget);
            }}
          >
            <Icon path={toolSelected.icon} size={1} />
            <Popper
              open={modal === "tools"}
              anchorEl={anchorEl}
              placement="right-start"
              disablePortal={false}
              modifiers={[
                {
                  name: "offset",
                  enabled: true,
                  options: {
                    offset: [0, 0],
                  },
                },
              ]}
            >
              <Paper
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#BFDBFE",
                  borderRadius: "1rem",
                  boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
                  padding: "10px",
                }}
              >
                <ClickAwayListener onClickAway={() => setModal(false)}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      margin: "0rem 1rem",
                    }}
                  >
                    {tools.map((tool) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "1rem",
                          alignItems: "center",
                        }}
                        onClick={() => setToolSelected(tool)}
                      >
                        <Icon path={tool.icon} size={1} />
                        <p>{tool.name}</p>
                      </div>
                    ))}
                  </div>
                </ClickAwayListener>
              </Paper>
            </Popper>
          </div>
          <div
            onClick={(e) => {
              setModal("colors");
              setAnchorEl(e.currentTarget);
            }}
          >
            <Icon
              path={colorSelected.name === "Eraser" ? mdiEraser : mdiRectangle}
              color={colorSelected.color}
              size={1}
            />
            <Popper
              open={modal === "colors"}
              anchorEl={anchorEl}
              placement="right-start"
              disablePortal={false}
              modifiers={[
                {
                  name: "offset",
                  enabled: true,
                  options: {
                    offset: [0, 0],
                  },
                },
              ]}
            >
              <Paper
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#BFDBFE",
                  borderRadius: "1rem",
                  boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
                  padding: "10px",
                  maxHeight: "506px",
                  overflow: "auto",
                }}
              >
                <ClickAwayListener onClickAway={() => setModal(false)}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      margin: "0rem 1rem",
                    }}
                  >
                    {colors.map((color) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "1rem",
                          alignItems: "center",
                        }}
                        onClick={() => setColorSelected(color)}
                      >
                        <Icon
                          path={
                            color.name === "Eraser" ? mdiEraser : mdiRectangle
                          }
                          size={1}
                          color={color.color}
                        />
                        <p>{color.name}</p>
                      </div>
                    ))}
                  </div>
                </ClickAwayListener>
              </Paper>
            </Popper>
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Icon path={mdiUndo} size={1} />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Icon path={mdiRedo} size={1} />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Icon path={mdiSquare} size={1} />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Icon path={mdiVectorCombine} size={1} />
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
        <div
          style={{
            backgroundColor: "rgb(0, 0, 0)",
            overflow: "auto",
            borderRadius: "1rem",
            width: breakPoint ? 900 : 300,
            height: breakPoint ? 506 : 184,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          // Guarda una proporción de 16:9 para el canvas y que se adapte al tamaño de la pantalla de acuerdo al breakpoint
          //width={breakPoint ? 900 : 300}
          //height={breakPoint ? 506 : 184}
        >
          <canvas
            ref={canvasRef}
            // width="620"
            width="320"
            height="240"
            // height="100%"
            id="keronote"
            style={{
              maxWidth: "100%",
              height: "100%",
              backgroundColor: "rgb(255,255, 255)",
            }}
          ></canvas>
        </div>
        <div
          style={{
            display: "flex",
            backgroundColor: "#BFDBFE",
            borderRadius: "1rem",
            boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
            padding: "10px 10px",
            height: "3rem",
            justifyContent: "space-around",
            alignItems: "center",
            width: "80%",
          }}
        >
          <div onClick={(e) => alertEvent(e)}>
            <Icon path={mdiArrowLeft} size={1} />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Icon path={mdiPause} size={1} />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Icon path={mdiPlay} size={1} />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Icon path={mdiStop} size={1} />
          </div>
          <div onClick={(e) => alertEvent(e)}>
            <Icon path={mdiArrowRight} size={1} />
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
              maxHeight: breakPoint ? "506px" : "184px",
            }}
          >
            {layers.map((layer: any, index: any) => (
              <div
                // onDoubleClick={(e) => {
                //   setLayers(
                //     layers.map((layer, i) => {
                //       if (i === index) {
                //         layer.isSelect = !layer.isSelect;
                //       }
                //       return layer;
                //     })
                //   );
                // }}
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
                <Layer
                  layer={layer}
                  layers={layers}
                  setLayers={setLayers}
                  selectedLayers={selectedLayers}
                  setSelectedLayers={setSelectedLayers}
                />
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
            <Icon path={mdiPlus} size={1} />
          </div>
          <div onClick={(e) => copyLayer()}>
            <Icon path={mdiContentDuplicate} size={1} />
          </div>
          <div
            onClick={(e) => {
              removeLayer();
            }}
          >
            <Icon path={mdiTrashCan} size={1} />
          </div>
        </section>
      </section>
      <section
        style={{
          display: "absolute",
          bottom: "10",
          left: "10",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "15px",
            backgroundColor: "#BFDBFE",
            borderRadius: "1rem",
            boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
          }}
        >
          <div
            onClick={(e) => {
              setModal("save");
              setAnchorEl(e.currentTarget);
            }}
          >
            <Icon path={mdiContentSave} size={1} />
          </div>
          <div
            onClick={(e) => {
              setModal("info");
              setAnchorEl(e.currentTarget);
            }}
          >
            <Icon path={mdiInformation} size={1} />
          </div>
        </div>
      </section>
      <Modal
        open={modal === "info"}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            padding: "15px",
            backgroundColor: "#BFDBFE",
            borderRadius: "1rem",
            boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
          }}
        >
          <h2 id="modal-modal-title">Information</h2>
          <p id="modal-modal-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, quibusdam, quia, quod voluptatem voluptate quos
            voluptates quas quibusdam, quia, quod voluptatem voluptate quos
          </p>
        </div>
      </Modal>

      <Modal
        open={modal === "save"}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            padding: "15px",
            backgroundColor: "#BFDBFE",
            borderRadius: "1rem",
            boxShadow: "rgb(0 0 0 / 25%) 0px 0px 4px 0px",
          }}
        >
          <h2 id="modal-modal-title">Save</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <TextField id="outlined-basic" label="Name" variant="filled" />
            <Button variant="contained" fullWidth>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </Stack>
  );
};

export default Canvas;
