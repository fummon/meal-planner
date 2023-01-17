import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipe, deleteRecipe } from "../../api/recipesApi";
import placeholderImg from "../../media/placeholderImg";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteDialog from "../deleteDialog/deleteDialog";
import PopulatedAddRecipeForm from "../addRecipe/populatedAddRecipeForm";
import { Grid, 
         Card, 
         CardHeader, 
         IconButton, 
         CardContent, 
         CardMedia,
         Typography, 
         CardActions,
         Dialog } from "@mui/material";

export default function RecipeCard ({recipe, setShowSuccessAlert}) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false); 
    const [showUpdateForm, setShowUpdateForm] = useState(false); 

    const queryClient = useQueryClient();

    const {isLoading: isUpdatingRecipe, mutate} = useMutation(updateRecipe, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries(["recipes"])
            setShowUpdateForm(false)
            setShowSuccessAlert(true)
        }})

    const {isLoading, mutate: deleteMutate} = useMutation(deleteRecipe, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries(["recipes"])
            setShowSuccessAlert(true)
            setShowDeleteDialog(false)
        }
    })

    return (
    <>
      <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              sx={{
                display: "flex",
                alignItems: "stretch",
              }}>
              <Card
                sx={{
                  p: 0,
                  width: "100%",
                }}><CardHeader
                  action={
                    <IconButton onClick={() => setShowDeleteDialog(true)} aria-label="delete">
                      <ClearIcon />
                    </IconButton>}
                  title={recipe.title}
                  subheader={recipe.createdDate}/>
                {recipe.imageSource.length === 0 ? placeholderImg : <CardMedia
                  component="img"
                  height="194"
                  image={recipe.imageSource}
                  alt={recipe.title}></CardMedia>}
                <CardContent
                  sx={{
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      mt: 1,
                    }}>
                    {recipe.notes}
                  </Typography>
                    <CardActions sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                      <IconButton onClick={() => setShowUpdateForm(true)}
                      variant="contained"
                      sx={{
                        mt: "15px",
                      }}
                      size="medium"
                      color="secondary">
                      <EditIcon>
                      </EditIcon>
                    </IconButton>
                    <IconButton variant="contained"
                      sx={{
                        mt: "15px",
                      }}
                      size="medium"
                      href={recipe.url}
                      target="_blank"
                      color="primary">
                      <OpenInNewIcon>
                      </OpenInNewIcon>
                    </IconButton>
                    </CardActions>
                </CardContent>
              </Card>
            </Grid>
      {showUpdateForm &&
        <Dialog
              fullWidth
              open={showUpdateForm}
              onClose={() => setShowUpdateForm(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
          <PopulatedAddRecipeForm recipe={recipe} setOpen={setShowUpdateForm} mutate={mutate} isLoading={isUpdatingRecipe} />
        </Dialog>}
      {showDeleteDialog && 
        <DeleteDialog recipeId={recipe.id} open={showDeleteDialog} setOpen={setShowDeleteDialog} mutate={deleteMutate} isLoading={isLoading} text={`Are you sure you want to delete recipe : ${recipe.title} ?`}/>}
    </>)
}