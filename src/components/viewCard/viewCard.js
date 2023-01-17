import React from 'react'
import { Dialog, Card, CardHeader, CardMedia, CardContent, Typography, IconButton  } from '@mui/material'
import placeholderImg from '../../media/placeholderImg'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function ViewCard ({open, setOpen, recipe}) {
    return (
        <Dialog
              fullWidth
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <CardHeader
                    action={
                        <IconButton variant="contained"
                            sx={{
                                mt: "15px",
                            }}
                            size="medium"
                            href={recipe.url}
                            target="_blank"
                            color="primary">
                                <OpenInNewIcon />
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
                </CardContent>
        </Dialog>
    )
}