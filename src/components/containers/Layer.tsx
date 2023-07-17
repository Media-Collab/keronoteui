import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

const Layer = (props: any) => {
  const { thumb, id, current } = props;
  // Assign initial name to thumb
  useEffect(() => {
    if (!thumb.__uiname)
      thumb.__uiname = "Layer " + id;
  }, [thumb]);

  return (
    <section
      style={{
        padding: "7px",
        backgroundColor: (id == current) ? "#83B0E7" : "#BFDBFE",
        borderRadius: "0.5rem",
      }}
    >
      <section
        style={{
          display: "flex",
          marginBottom: "0.5rem",
        }}
      >
        <input
          style={{
            fontSize: "9px",
            margin: "0px",
            background: "white",
            width: "100%",
            height: "1.5rem",
            textAlign: "center",
            borderRadius: "0.5rem",
            fontWeight: "600",
            border: "none",
          }}
          value={thumb.__uiname}
          disabled
          onChange={(e) => {
            thumb.__uiname = e.target.value;
          }}
        />
      </section>
      <canvas
        style={{
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: "100%",
          minWidth: "100px",
          borderRadius: "0.5rem",
        }}
      ></canvas>
    </section>
  );
};

export default Layer;
