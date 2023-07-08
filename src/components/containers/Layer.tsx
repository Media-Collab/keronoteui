const Layer = (props: any) => {
  const { layer, setLayers, layers } = props;
  const { name, isSelect } = layer;

  return (
    <section
      style={{
        padding: "7px",
        backgroundColor: !isSelect ? "#BFDBFE" : "#83B0E7",
        borderRadius: "0.5rem",
      }}
    >
      <canvas
        style={{
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: "80px",
          minWidth: "100px",
          borderRadius: "0.5rem",
        }}
      ></canvas>
      <input
        style={{
          fontSize: "11px",
          margin: "0px",
          background: "white",
          width: "100%",
          padding: "3px",
          textAlign: "center",
          borderRadius: "0.5rem",
          fontWeight: "600",
          border: "none",
        }}
        value={name}
        disabled={!isSelect}
        onChange={(e) => {
          setLayers(
            layers.map((layer: any) => {
              if (layer.isSelect) {
                layer.name = e.target.value;
              }
              return layer;
            })
          );
        }}
      />
    </section>
  );
};

export default Layer;
