import React, { useState } from 'react'; 
import { 
  Stack, 
  Grid, 
  CardMedia, 
  TextField, 
  Box,
  Button,
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogActions } from '@mui/material';
import Food from '../../media/food';
import CategoryOptions from './categoryOptions';

export default function CreateRecipeForm({selectedRecipe, open, setOpen, mutate})
{
    const [newRecipe, setNewRecipe] = useState({
      id: selectedRecipe.id,
      ...selectedRecipe
    }); 

  const handleClick = (e) => {
    e.preventDefault(); 
    mutate(newRecipe);
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const placeholderImg = (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Food height="250" width="250"/>
    </Box> )

    return (
      <Dialog
      open={open}
      onClose={handleClose}
      fullWidth>
        <Grid item>
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
              <Button onClick={handleClose} variant="contained" color="error" mt={2}>
              Cancel
            </Button>
            <Button onClick={(e) => handleClick(e)} variant="contained" mt={2}>
              Save
            </Button>
            </DialogActions>
          </Grid>
        </Dialog>
    )
}