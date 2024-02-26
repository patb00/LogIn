// Gumb.tsx

import { Button } from "@mui/material";
import React from "react";

interface GumbProps {
  buttonText: string;
  variant: 'text' | 'outlined' | 'contained';
  onClick: () => void; 
}

const Gumb: React.FC<GumbProps> = ({ buttonText, variant, onClick }) => {
    return (
        <Button variant={variant} color='primary' fullWidth style={{ marginBottom: '10px' }} onClick={onClick}>{buttonText}</Button>
    ) 
}

export default Gumb;
