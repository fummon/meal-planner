import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Spinner () {
    return (
        <Box sx={{height: '50vh', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
            <CircularProgress size={100} thickness={5} color="primary" />
        </Box>
    )
}