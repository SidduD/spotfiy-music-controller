import { Button, ButtonGroup, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function hostInRoom() {
      await axios.get(`/api/user-in-room`).then(({ data }) => {
        if (data["code"]) {
          setIsLoading(false);
          navigate(`/room/${data["code"]}`);
        }
        setIsLoading(false);
      });
    }
    hostInRoom();
  }, []);

  if (isLoading) return <Loader />;
  return (
    <Grid container spacing={3} align="center" direction="column">
      <Grid xs={12}>
        <Typography variant="h3" component="h3">
          House Party
        </Typography>
      </Grid>
      <Grid xs={12}>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

export default HomePage;
