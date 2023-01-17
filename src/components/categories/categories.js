import React from "react"
import { RadioGroup, FormControl, FormControlLabel, Radio } from "@mui/material"

export default function Categories ({category, setCategory}) {
    return (<FormControl>
        <RadioGroup row value={category}>
          <FormControlLabel value={1} control={<Radio onChange={() => setCategory(1)} />} label="Breakfast" />
          <FormControlLabel value={2} control={<Radio onChange={() => setCategory(2)} />} label="Lunch" />
          <FormControlLabel value={3} control={<Radio onChange={() => setCategory(3)} />} label="Dinner" />
          <FormControlLabel value={4} control={<Radio onChange={() => setCategory(4)} />} label="Dessert" />
          <FormControlLabel value={0} control={<Radio onChange={() => setCategory(0)} />} label="All" />
        </RadioGroup>
      </FormControl>)
}