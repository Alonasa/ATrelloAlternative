import React from "react";
import Grid from "@mui/material/Grid";
import {Link} from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <Grid item>
      <h1>Page is not found</h1>
      <p>You can come back to <Link to={'/'}>Main Page</Link></p>
    </Grid>
  );
};
