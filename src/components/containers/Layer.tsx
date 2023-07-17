import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

const Layer = (props: any) => {
  const { layer, setLayers, layers, selectedLayers, setSelectedLayers } = props;
  const { id, name, isSelect } = layer;

  const [isSelected, setIsSelected] = useState(isSelect);

  useEffect(() => {
    setIsSelected(selectedLayers.includes(id));
  }, [selectedLayers, id]);

  return (
    <section
      style={{
        padding: "7px",
        backgroundColor: isSelected ? "#83B0E7" : "#BFDBFE",
        borderRadius: "0.5rem",
      }}
    >
      <section
        style={{
          display: "flex",
          marginBottom: "0.5rem",
        }}
      >
        <Checkbox
          checked={isSelected}
          onChange={() => {
            setIsSelected(!isSelected);
            if (!isSelected) {
              setSelectedLayers([...selectedLayers, id]);
            } else {
              setSelectedLayers(
                selectedLayers.filter((selectedId) => selectedId !== id)
              );
            }
          }}
        />

        <input
          style={{
            fontSize: "11px",
            margin: "0px",
            background: "white",
            width: "100%",
            height: "2rem",
            textAlign: "center",
            borderRadius: "0.5rem",
            fontWeight: "600",
            border: "none",
          }}
          value={name}
          disabled={!isSelected}
          onChange={(e) => {
            setLayers(
              layers.map((layer: any) => {
                if (layer.id === id) {
                  layer.name = e.target.value;
                }
                return layer;
              })
            );
          }}
        />
      </section>
      <canvas
        style={{
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: "80px",
          minWidth: "100px",
          borderRadius: "0.5rem",
        }}
      ></canvas>
    </section>
  );
};

export default Layer;
