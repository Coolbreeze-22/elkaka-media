import React from "react";
import { IconButton, Grid, TextField, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      label={label}
      autoFocus={autoFocus}
      type={type}
      variant="outlined"
      required
      fullWidth
      sx={{backgroundColor:"#051744", borderRadius:"30px"}}
      InputProps={ name === "password" ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            } : null}
    />
  </Grid>
);

export default Input;
