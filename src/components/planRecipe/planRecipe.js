import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRecipes } from "../../api/recipesApi";
import Categories from "../categories/categories"; 
import AddIcon from '@mui/icons-material/Add';
import Spinner from "../spinner/spinner"; 
import { 
    Dialog, 
    Grid, 
    Box, 
    DialogTitle, 
    DialogContent, 
    ListItem, 
    ListItemText, 
    List, 
    IconButton } from "@mui/material";

export default function PlanRecipe({dayOfWeek, open, setOpen, mutate, isAddingRecipe}) {
const [category, setCategory] = useState(0); 

const queryClient = useQueryClient(); 

const { isLoading,
        data: recipes } = useQuery(["recipes"], getRecipes, {
            select: data => data.filter(recipe => {
                    if (recipe.category === category || category === 0)
                    {
                        return recipe
                    }

                    return null; 
                })}); 


    
    return (<Dialog
              fullWidth
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <Grid item>
                {isLoading || isAddingRecipe ? <Spinner /> : 
                <>
          <DialogTitle>Plan meal</DialogTitle>
            <DialogContent
              fullwidth="true">
                <Categories category={category} setCategory={setCategory} />
                <Box sx={{ width: '100%', height: 400, maxWidth: 360 }}>
                <List
                    height={400}
                    width={360}>
                    {recipes && recipes.map(recipe => (
                        <ListItem key={recipe.id}>
                            <ListItemText primary={recipe.title}/>
                                <IconButton onClick={() => mutate({dayOfWeek, recipeId: recipe.id, title: recipe.title, category: recipe.category})}>
                                    <AddIcon /> 
                                </IconButton>
                        </ListItem>))}
                </List>
                </Box>
            </DialogContent>
            <br />
            </>
            }
          </Grid>
        </Dialog>)
}