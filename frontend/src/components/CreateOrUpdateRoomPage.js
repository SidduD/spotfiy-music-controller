import {
  TextField,
  Button,
  Typography,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Collapse,
  Alert
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateOrUpdateRoomPage({
  title,
  buttonText,
  votesToSkipUpdated = 1,
  guestCanPauseUpdated = false,
  roomCode
}) {
  const [guestCanPause, setGuestCanPause] = useState(guestCanPauseUpdated);
  const [votesToSkip, setVotesToSkip] = useState(votesToSkipUpdated);
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const navigate = useNavigate();

  async function handleCreateUpdateRoom() {
    if (roomCode) {
      try {
        const response = await axios.patch("/api/update-room", {
          votes_to_skip: votesToSkip,
          guest_can_pause: guestCanPause,
          code: roomCode
        });
        if (response.status === 200) {
          setSuccMsg("Successfully updated room settings");
        }
      } catch (err) {
        setErrMsg("Error updating room settings");
      }
    } else {
      const { data } = await axios.post("/api/create-room", {
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause
      });
      navigate(`/room/${data["code"]}`);
    }
  }

  return (
    <Grid container spacing={1} direction="column">
      <Grid xs={12} align="center">
        <Collapse in={succMsg != ""}>
          {succMsg && (
            <Alert
              severity="success"
              onClose={() => {
                setSuccMsg("");
                setErrMsg("");
              }}
            >
              {succMsg}
            </Alert>
          )}
        </Collapse>
        <Collapse in={errMsg != ""}>
          {errMsg && (
            <Alert
              severity="error"
              onClose={() => {
                setSuccMsg("");
                setErrMsg("");
              }}
            >
              {errMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title ? title : "Create A Room"}
        </Typography>
      </Grid>
      <Grid xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>Guest Control of Playback State</FormHelperText>
          <RadioGroup
            row
            value={guestCanPause}
            onChange={(e) => setGuestCanPause(e.target.value)}
            align="center"
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid xs={12} align="center">
        <FormControl>
          <TextField
            variant="standard"
            required={true}
            type="number"
            defaultValue={votesToSkip}
            onChange={(e) => setVotesToSkip(Number(e.target.value))}
            inputProps={{
              min: 1,
              style: { textAlign: "center" }
            }}
          />
          <FormHelperText align="center">
            Votes Required To Skip Song
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleCreateUpdateRoom}
          fullWidth
        >
          {buttonText ? buttonText : "Create"} Room
        </Button>
      </Grid>
      <Grid xs={12} align="center">
        <Button
          color="secondary"
          variant="contained"
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

export default CreateOrUpdateRoomPage;

// const requestOptions = {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     votes_to_skip: votesToSkip,
//     guest_can_pause: guestCanPause
//   })
// };
// fetch("/api/create-room", requestOptions)
//   .then((response) => response.json())
//   .then((data) => console.log(data));
