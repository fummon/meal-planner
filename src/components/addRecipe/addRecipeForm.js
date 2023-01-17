import React, { useState } from "react";
import { getRecipeByUrl } from "../../api/recipesApi";
import PopulatedAddRecipeForm from './populatedAddRecipeForm'; 
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'; 
import { addRecipe } from "../../api/recipesApi";
import { Dialog, 
         DialogTitle, 
         DialogContent, 
         DialogActions, 
         Button,
         TextField,
         Alert} from "@mui/material";
import Spinner from "../spinner/spinner";

export default function AddRecipeForm({open, setOpen, setShowSuccessAlert, setShowErrorAlert}) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState(false); 

    const {
        data: recipe,
        isFetching,
        refetch
    } = useQuery(["recipe", url], getRecipeByUrl, {
        enabled: false,
        onError: () => setShowErrorAlert(true)
    }); 

    const queryClient = useQueryClient(); 

    const {isLoading, mutate} = useMutation(addRecipe, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries(["recipes"])
            setOpen(false)
            setShowSuccessAlert(true)
        }
    })

    function validateInput(url) {
        if (url === '')
        {
            setError(true)
        } else {
            refetch(); 
        }
    }

    let urlFormDialogContent = (<>
            <DialogTitle id="alert-dialog-title">
                {"Add recipe"}
              </DialogTitle>
              <DialogContent>
                 <TextField 
                        fullWidth
                        placeholder='Enter recipe url'
                        id='add-recipe' 
                        onChange={e => setUrl(e.target.value)} 
                        value={url}>
                    </TextField>
                    {error && <Alert severity="error">Url cannot be empty</Alert>}
              </DialogContent>
              <br />
              <br />
              <DialogActions>
                <Button variant="contained" color="error" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={() => validateInput(url)} >Submit</Button>
              </DialogActions>
              </>)

    let content;
    const formattedDate = new Date().toLocaleString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"}).toString(); 

    content = <Dialog
              fullWidth
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              {recipe === undefined ? 
                isFetching ? <Spinner /> : 
                    urlFormDialogContent : 
                <PopulatedAddRecipeForm recipe={{
                    title: recipe.title,
                    category: recipe.category,
                    notes: recipe.notes,
                    imageSource: recipe.imageSource,
                    url: recipe.url,
                    createdDate: formattedDate
                }}  setOpen={setOpen} 
                    mutate={mutate}
                    isLoading={isLoading} />}
            </Dialog>
    
    return (<>
            {content}
            </>); 
}
