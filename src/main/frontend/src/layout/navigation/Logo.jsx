export default function Logo(props) {
  return (
    <div
      className="demo-logo-vertical"
      style={{ position: "relative", width: "100%", height: "56px", marginTop: "10px", marginBottom: "20px" }}
    >
      <a
        href="#"
        style={{
          width: "100%",
          height: "56px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="../../../../img/gyulobal3white.png"
          style={{
            position: "absolute",
            width: "80%",
            opacity: props.collapsed ? 0 : 1, // collapsed가 false일 때 보이기
            transition: "opacity 0.5s ease",
          }}
        />
        <img
          src="../../../../img/gyulobal1white.png"
          style={{
            position: "absolute",
            height: "30px",
            opacity: props.collapsed ? 1 : 0, // collapsed가 true일 때 보이기
            transition: "opacity 0.5s ease",
          }}
        />
      </a>
    </div>
  );
}
