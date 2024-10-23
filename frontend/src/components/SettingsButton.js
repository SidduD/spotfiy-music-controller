import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function SettingsButton({ setShowUpdate }) {
  return (
    <Grid xs={12}>
      <Button variant="outlined" onClick={() => setShowUpdate(true)} fullWidth>
        <SettingsIcon />
      </Button>
    </Grid>
  );
}

export default SettingsButton;
