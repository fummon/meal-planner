import React from 'react';
import RecipeList from './components/recipeList/recipeList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FullLayout from './layouts/FullLayout';
import Planner from './components/planner/planner';

function App() {

    return(
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<FullLayout />}>
                        <Route path="/recipes" element={<RecipeList />} />
                        <Route path="/planner" element={<Planner />} />
                    </Route>
                </Routes>
          </BrowserRouter>)
}

export default App;
