import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";
import Loader from "./Loader";
import SettingsButton from "./SettingsButton";
import CreateOrUpdateRoomPage from "./CreateOrUpdateRoomPage";
import Song from "./Song";

function Room() {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [spotifyAuth, setSpotifyAuth] = useState(false);
  const [song, setSong] = useState({});

  const { roomCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/get-room?code=${roomCode}`)
      .then((response) => {
        if (response.status === 200) {
          setVotesToSkip(response.data["votes_to_skip"]);
          setGuestCanPause(response.data["guest_can_pause"]);
          setIsHost((host) => {
            const updatedHost = response.data["is_host"];
            if (updatedHost) {
              authenticateSpotify();
            }

            return updatedHost;
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        navigate("/");
      });
  }, [roomCode, authenticateSpotify]);

  function authenticateSpotify() {
    axios.get("/spotify/is-authenticated").then((response) => {
      setSpotifyAuth(response.data.status);
      if (!response.data.status) {
        axios
          .get("/spotify/get-auth-url")
          .then((response) => window.location.replace(response.data.url));
      }
    });
  }
  async function handleLeaveRoom() {
    await axios.post("/api/leave-room", {}).then((response) => {
      if ((response.status = 200)) navigate("/");
    });
  }

  if (isLoading) return <Loader />;
  if (showUpdate)
    return (
      <CreateOrUpdateRoomPage
        title={"Update Room"}
        buttonText={"Update"}
        votesToSkipUpdated={votesToSkip}
        guestCanPauseUpdated={guestCanPause}
        roomCode={roomCode}
      />
    );

  return (
    <Grid container direction="column" spacing={1} align="center">
      {isHost && <SettingsButton setShowUpdate={setShowUpdate} />}
      <Grid xs={12}>
        <Typography variant="h5" component="h5">
          Code: {roomCode}
        </Typography>
      </Grid>

      <Song isHost={isHost} setSong={setSong} song={song} />

      <Grid xs={12}>
        <Button variant="contained" color="secondary" onClick={handleLeaveRoom}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default Room;
