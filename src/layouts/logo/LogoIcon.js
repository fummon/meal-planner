import React from "react";
import { Link, Typography } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';

const LogoIcon = () => {
  return (
    <Link href="/" sx={{textDecoration: 'none'}}>
      <Typography variant='h3' ><RestaurantIcon />  Meal Planner</Typography>
    </Link>
  );
};

export default LogoIcon;
