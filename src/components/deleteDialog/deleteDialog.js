import React from "react"
import Spinner from "../spinner/spinner"; 
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    Button } from "@mui/material"

export default function DeleteDialog({recipeId = null, open, setOpen, mutate, isLoading, text}){

    return (<Dialog
              fullWidth
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              {isLoading ? <Spinner /> : 
              <>
              <DialogTitle id="alert-dialog-title">
                {recipeId ? "Delete recipe" : "Clear all"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {text}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="primary" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="contained" color="error" onClick={() => mutate(recipeId)} autoFocus>
                  Delete
                </Button>
              </DialogActions>
              </>
            }
            </Dialog>
    )
}