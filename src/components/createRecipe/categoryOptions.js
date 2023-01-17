import React from "react"
import { 
    FormControl, 
    FormLabel, 
    RadioGroup, 
    FormControlLabel, 
    Radio } from "@mui/material"

export default function CategoryOptions({newRecipe, setNewRecipe}) {
     const mealCategories = ['None', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];
     
    return (
        <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
                <RadioGroup
                  aria-labelledby="Category-radio-buttons-group-label"
                  name="radio-buttons-group"
                  onChange={(e) => setNewRecipe({...newRecipe, category: parseInt(e.target.value)})}
                >
                  {mealCategories.map((category, index) => 
                    (index === newRecipe.category ? <FormControlLabel
                    key={index}
                    value={index}
                    control={<Radio checked/>}
                    label={category} /> :
                    <FormControlLabel
                    key={index}
                    value={index}
                    control={<Radio />}
                    label={category} />))
                  }
                </RadioGroup>
              </FormControl>
    )
}