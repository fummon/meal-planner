import React from 'react'; 
import { Snackbar, Alert } from '@mui/material';

export default function SuccessAlert({ open, setOpen, severity, text}){

  const handleClose = () => {
    setOpen(false);
  }

    return (
        <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={6000} onClose={handleClose} >
          <Alert variant="filled" severity={severity} sx={{ width: '100%' }}>
              {text}
          </Alert>
      </Snackbar>
    )
}