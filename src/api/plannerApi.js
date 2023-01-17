import axios from "axios"; 

const plannerApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export const getRecipes = async () => {
    const response = await plannerApi.get("/planner");
    return response.data;
};

export const getRecipesByDay = async ({queryKey}) => {
    const dayOfWeek = encodeURIComponent(queryKey[1]); 
    const response = await plannerApi.get(`/planner/recipesByDay?dayOfWeek=${dayOfWeek}`, dayOfWeek);
    return response.data;
};

export const addPlannedRecipe = async (plannedRecipe) => {
    return await plannerApi.post("/planner", plannedRecipe);
};

export const deleteRecipe = async (id) => {
    return await plannerApi.delete(`/planner/${id}`, id);
};

export const deleteAllRecipes = async (day) => {
    return await plannerApi.delete(`/planner/recipesByDay`);
};

export default plannerApi;