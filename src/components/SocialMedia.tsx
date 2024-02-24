import React from "react";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const SocialMedia = () => {
    return (
        <Box sx={{ '& > :not(style)': { m: 1, mb: 2 } }}>
        <Fab color="primary" aria-label="add">
          <FacebookOutlinedIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit">
          <InstagramIcon />
        </Fab>
        <Fab color="primary">
          <LinkedInIcon />
        </Fab>
      </Box>
    )
}

export default SocialMedia;