import axios from "axios";
import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  IconButton,
  Typography,
  LinearProgress,
  Popover
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";

function Song({ isHost, song, setSong }) {
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("/spotify/current-song").then((response) => {
        if (response.status !== 200) return {};
        else setSong(response.data);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const songProgress = (song.time / song.duration) * 100;
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  function pauseSong() {
    axios
      .put("/spotify/pause")
      .then((response) => {
        if (response.status === 405) {
          console.log("Only hose has permission to play/pause");
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message)
          console.log(err.response?.data?.message);
      });
  }

  function playSong() {
    axios
      .put("/spotify/play")
      .then((response) => {
        if (response.status === 405) {
          console.log("Only host has permission to play/pause");
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message)
          console.log(err.response?.data?.message);
      });
  }

  function skipSong(e) {
    axios
      .post("/spotify/skip")
      .then((response) => {
        if (response.status === 405) {
          console.log("Only host has permission to control music player");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
    setAnchorEl(anchorEl ? null : e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper elevation={8} sx={{ my: "2rem" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "auto", sm: "1fr 2fr" },
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "left" },
            alignItems: "center",
            my: { xs: "1rem", sm: "0" }
          }}
        >
          <Box
            component="img"
            alt={song.title}
            src={song.image_url}
            sx={{
              objectFit: "cover",
              width: { xs: "40%", sm: "60%", md: "70" },
              height: "auto"
            }}
          />
        </Box>
        <Box>
          <Typography component="h5" variant="h5">
            {song.title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {song.artist}
          </Typography>
          <IconButton
            onClick={() => {
              song.is_playing ? pauseSong() : playSong();
            }}
          >
            {song.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>

          <IconButton aria-describedby={id} onClick={skipSong}>
            <SkipNextIcon />
          </IconButton>

          {isHost ? null : (
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography>Votes Count/ Votes Required to skip</Typography>
                <Typography align="center">
                  {song.votes + 1}/{song.votes_required}
                </Typography>
              </Box>
            </Popover>
          )}
        </Box>
      </Box>
      <LinearProgress variant="determinate" value={songProgress} />
    </Paper>
  );
}

export default Song;
