import React, { useState } from "react";
import placeholderImg from "../../media/placeholderImg";
import CategoryOptions from "../createRecipe/categoryOptions";
import { Grid,
         DialogTitle,
         DialogContent,
         Stack,
         TextField,
         DialogActions,
         Button,
         CardMedia
 } from "@mui/material";    
 import Spinner from "../spinner/spinner";

export default function PopulatedAddRecipeForm ({recipe, setOpen, mutate, isLoading}) {
    const [newRecipe, setNewRecipe] = useState({...recipe});

    return (<Grid item>
          {isLoading ? <Spinner /> : 
          <>
          <DialogTitle>Recipe information</DialogTitle>
            <DialogContent
              fullwidth="true">
            <Stack spacing={3}>
              {newRecipe.imageSource.length === 0 ? placeholderImg : <CardMedia  component="img" height="194" image={newRecipe.imageSource} alt={newRecipe.title}></CardMedia> }
              <TextField 
                  id="title" 
                  label="Title" 
                  variant="outlined" 
                  value={newRecipe.title}
                  onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}/>
              <TextField 
                  id="notes" 
                  label="Notes" 
                  variant="outlined" 
                  multiline
                  rows={4}
                  value={newRecipe.notes}
                  onChange={(e) => setNewRecipe({...newRecipe, notes: e.target.value})}/>
            <CategoryOptions newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            </Stack>
            </DialogContent>
            <br />
              <DialogActions>
              <Button onClick={() => setOpen(false)} variant="contained" color="error" mt={2}>
                Cancel
              </Button>
                <Button onClick={() => mutate({newRecipe})} variant="contained" mt={2}>
                Save
              </Button>
            </DialogActions>
            </>}
          </Grid>)
}