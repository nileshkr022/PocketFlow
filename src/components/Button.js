import { Button as MuiButton } from "@material-ui/core";
import React from 'react';

const Button = ({ color, text, variant, onClick, isDisabled }) => {
  return (
    <MuiButton
      onClick={onClick}
      color = {color}
      variant={variant || "contained"}
      disabled = {false ||  isDisabled } 
    >
      {text}
    </MuiButton>
  );
};

export default Button;
