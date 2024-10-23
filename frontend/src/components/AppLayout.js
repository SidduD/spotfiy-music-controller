import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <Outlet />
    </Container>
  );
}

export default AppLayout;
