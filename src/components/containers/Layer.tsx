import { useState, useEffect, useRef } from "react";
// @ts-ignore
import { KeroContext, KeroPreview } from "keronote";
import Checkbox from "@mui/material/Checkbox";

const Layer = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [name, setName] = useState("");
  const { useKero, id, current } = props;
  // Assign initial name to thumb
  useKero((k: KeroContext) => {
    let preview = k.preview;
    if(canvasRef.current)
      preview.capture(canvasRef.current, id);
    // Assign A Name
    if (!name)
      setName("Layer " + id);
  });

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
          value={name}
          disabled
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </section>
      <div
          style={{
            backgroundColor: "rgb(0, 0, 0)",
            overflow: "auto",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          // Guarda una proporción de 16:9 para el canvas y que se adapte al tamaño de la pantalla de acuerdo al breakpoint
          //width={breakPoint ? 900 : 300}
          //height={breakPoint ? 506 : 184}
        >
      <canvas
        width="160"
        height="120"
        // @ts-ignore
        ref={canvasRef}
        id={"thumb" + id}
        style={{
          width: "80%",
          height: "100%",
          backgroundColor: "rgb(255,255, 255)",
        }}
      ></canvas>
      </div>
    </section>
  );
};

export default Layer;
