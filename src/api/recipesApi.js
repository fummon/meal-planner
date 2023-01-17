import axios from "axios"; 

const recipesApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export const getRecipes = async () => {
    const response = await recipesApi.get("/recipes");
    return response.data;
};

export const getRecipeByUrl = async ({queryKey}) => {
    const url = encodeURIComponent(queryKey[1]); 
    const response = await recipesApi.get(`/recipes/recipe?url=${url}`, url);
    return response.data;
};

export const addRecipe = async ({newRecipe}) => {
    return await recipesApi.post("/recipes", newRecipe);
};

export const updateRecipe = async ({newRecipe}) => {
    console.log(newRecipe)
    return await recipesApi.put(`/recipes`, newRecipe);
};

export const deleteRecipe = async (id) => {
    console.log(id)
    return await recipesApi.delete(`/recipes/${id}`, id);
};

export default recipesApi;