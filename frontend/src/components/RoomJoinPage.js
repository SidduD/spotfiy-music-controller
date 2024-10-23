import { TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RoomJoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleClick(e) {
    // We are giving the roomCode as data instead as query parameter like we did
    // in CreateRoom.js
    try {
      await axios
        .post("/api/join-room", { code: roomCode })
        .then((response) => {
          if (response.status === 200) {
            navigate(`/room/${roomCode}`);
          }
        });
    } catch (err) {
      setError("Room Not Found");
      setRoomCode("");
    }
  }

  return (
    <Grid container spacing={1} direction="column" align="center">
      <Grid xs={12}>
        <Typography variant="h4" component="h4">
          Join A Room
        </Typography>
      </Grid>
      <Grid xs={12}>
        <TextField
          error={!!error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="filled"
          onChange={(e) => setRoomCode(e.target.value)}
          sx={{ my: "1rem" }}
        />
      </Grid>

      <Grid xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          fullWidth
        >
          Enter Room
        </Button>
      </Grid>

      <Grid xs={12}>
        <Button
          variant="contained"
          color="secondary"
          to="/"
          component={Link}
          fullWidth
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

export default RoomJoinPage;
