import { Card, CardContent, CardHeader, Grid, ListItem, Chip, Typography, Button, Divider, List } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteRecipe, deleteAllRecipes, getRecipes as getPlannedRecipes } from "../../api/plannerApi";
import theme from "../../theme/theme";
import React, { useState } from "react";
import PlanRecipe from "../planRecipe/planRecipe";
import { getRecipes } from "../../api/recipesApi";
import ViewCard from "../viewCard/viewCard";
import DeleteDialog from "../deleteDialog/deleteDialog";
import SuccessAlert from "../successAlert/successAlert";
import Spinner from "../spinner/spinner";
import { addPlannedRecipe } from "../../api/plannerApi";

export default function Planner() {
    const [openDialog, setOpenDialog] = useState(false); 
    const [openCardDialog, setOpenCardDialog] = useState(false); 
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
    const [showSuccessAlert, setShowSuccessAlert] = useState(false); 
    const [recipeForCard, setRecipeForCard] = useState(null); 
    const [dayOfWeek, setDayOfWeek] = useState(); 
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",];
    const mealCategories = ["None", "Breakfast", "Lunch", "Dinner", "Dessert"]; 

    const { isLoading,
        data: recipes } = useQuery(["recipesByDay"], getPlannedRecipes); 
    const queryClient = useQueryClient(); 

    const { isLoading: isAddingRecipe, mutate: planRecipeMutation } = useMutation(addPlannedRecipe, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries(["recipesByDay"])
            setOpenDialog(false)
        }
    })

    const { mutate } = useMutation(deleteRecipe, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries(["recipesByDay"])
        }
    })

    const { mutate: deleteMutate }  = useMutation(deleteAllRecipes, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries(["recipesByDay"])
            setOpenDeleteDialog(false)
            setShowSuccessAlert(true)
        }
    })

    const handleCardClick = (index) => {
        setOpenDialog(true)
        setDayOfWeek(index)
    }

    const handleChipClick = (event, recipe) => {
        event.stopPropagation(); 
        queryClient.ensureQueryData(["recipes"], getRecipes).then(data => {
            const cachedRecipe = data.find(r => r.id === recipe.recipeId)
            setRecipeForCard(cachedRecipe)
            setOpenCardDialog(true)
        }); 
    }

    const handleClearAll = () => {
        if (recipes.length > 0)
        {
            setOpenDeleteDialog(true)
        }
    }

    return (
        isLoading ? <Spinner /> :
        <>
        <Button variant="contained" color="primary" onClick={handleClearAll}>Clear all</Button>
        {(openDeleteDialog && recipes.length > 0) && <DeleteDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} mutate={deleteMutate} text={`Are you sure you want to clear all recipes?`}/>}
        {showSuccessAlert && <SuccessAlert open={showSuccessAlert} setOpen={setShowSuccessAlert} severity="success" text="Success!" />}
        {openDialog && <PlanRecipe dayOfWeek={dayOfWeek} open={openDialog} setOpen={setOpenDialog} mutate={planRecipeMutation} isAddingRecipe={isAddingRecipe}/>}
        {openCardDialog && <ViewCard open={openCardDialog} setOpen={setOpenCardDialog} recipe={recipeForCard}/>}
        <Grid container>
            {days.map((day, index) => (
                <Grid item
                      key={index}
                      xs={12}
                      sm={6}
                      lg={4}
                      sx={{
                        display: "flex",
                        alignItems: "stretch" }}>
                    <Card onClick={() => handleCardClick(index)} 
                          sx={{ p: 0,
                                width: "100%",
                                '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                color: 'white'} }}>
                        <CardHeader title={day} titleTypographyProps={{variant: 'h2'}}></CardHeader>
                        <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                            <List>{recipes && recipes.map((recipe) => {
                                if (recipe.dayOfWeek === index)
                                {
                                    return <ListItem key={recipe.id}>
                                                <List>
                                                    <ListItem>
                                                        <Typography variant="h5">
                                                            {mealCategories[recipe.category]}
                                                        </Typography>
                                                    </ListItem>
                                                    <Divider />
                                                    <ListItem>
                                                        <Chip onClick={event => handleChipClick(event, recipe)} sx={{width: 200}} label={recipe.title} onDelete={() => mutate(recipe.id)} />
                                                    </ListItem>
                                                </List>  
                                            </ListItem>
                                }

                                    return null; 
                                })}
                            </List>
                        </CardContent>
                    </Card>
                </Grid> )
            )}
        </Grid>
        </>
    )
}