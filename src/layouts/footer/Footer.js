import React from "react";
import { Box, Typography } from "@mui/material";
const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography>
        © 2022 All rights reserved by{" "}
          <a href="https://www.wrappixel.com">Wrappixel.com</a>
      </Typography>
    </Box>
  );
};

export default Footer;
