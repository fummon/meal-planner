import React, { useState } from 'react'; 
import { getRecipes } from '../../api/recipesApi';
import { useQuery } from '@tanstack/react-query';
import RecipeCard from '../recipeCard/recipeCard';
import AddBoxIcon from '@mui/icons-material/AddBox'; 
import { Grid, 
         IconButton} from '@mui/material';
import AddRecipeForm from '../addRecipe/addRecipeForm';
import SuccessAlert from '../successAlert/successAlert';
import Categories from '../categories/categories';
import Spinner from '../spinner/spinner';

export default function RecipeList() {
  const [category, setCategory] = useState(0); 
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false); 
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false); 

    const {
        isLoading,
        data: recipes
    } = useQuery(["recipes"], getRecipes, {
      select: data => data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
    }); 

  return (
    isLoading ? 
    <Spinner /> : 
    <Grid container>
      {showSuccessAlert && <SuccessAlert open={showSuccessAlert} setOpen={setShowSuccessAlert} severity="success" text="Success!" />}
      {showErrorAlert && <SuccessAlert open={showErrorAlert} setOpen={setShowErrorAlert} severity="error" text="Invalid url." />}
      <Categories category={category} setCategory={setCategory} />
      <IconButton color="primary" variant="contained" onClick={() => setShowAddRecipeForm(true)}><AddBoxIcon /></IconButton>
      {showAddRecipeForm && <AddRecipeForm open={showAddRecipeForm} setOpen={setShowAddRecipeForm} setShowSuccessAlert={setShowSuccessAlert} setShowErrorAlert={setShowErrorAlert} />}
      <Grid container>
      {recipes.map((recipe) => {
              if (recipe.category === category || category === 0)
              {
                return <RecipeCard key={recipe.id} recipe={recipe} setShowSuccessAlert={setShowSuccessAlert} />
              }

              return null;
            })}
      </Grid>
    </Grid>
  );
}