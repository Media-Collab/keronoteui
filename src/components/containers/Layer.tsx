const Layer = ({ nameLayer }: any) => {
  return (
    <section
      style={{
        padding: "2px",
        backgroundColor: "#BFDBFE",
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
      <p
        style={{
          fontSize: "11px",
          margin: "0px",
          background: "white",
          width: "100%",
          padding: "3px",
          textAlign: "center",
          borderRadius: "0.5rem",
          fontWeight: "600",
        }}
      >
        {nameLayer !== null ? nameLayer : "Default"}
      </p>
    </section>
  );
};

export default Layer;
