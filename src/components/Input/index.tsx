import { TextField, TextFieldProps, Typography, Box } from "@mui/material";
import { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends Omit<TextFieldProps, "variant"> {
  label: string;
  error?: boolean;
  errorMessage?: string;
  register?: UseFormRegister<any>;
  name: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, errorMessage, register, name, ...rest }, ref) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography
          variant="subtitle2"
          component="label"
          htmlFor={name}
          sx={{
            color: error ? "error.main" : "text.primary",
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
        <TextField
          {...(register && register(name))}
          id={name}
          variant="outlined"
          error={error}
          helperText={errorMessage}
          inputRef={ref}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#474747",
              borderRadius: "10px",
              "& fieldset": {
                borderColor: error ? "error.main" : "transparent",
              },
              "&:hover fieldset": {
                borderColor: error ? "error.main" : "rgba(255, 255, 255, 0.1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: error ? "error.main" : "primary.main",
              },
            },
            "& .MuiInputBase-input": {
              backgroundColor: "#474747",
              color: "text.primary",
              borderRadius: "10px",
              "&::placeholder": {
                color: "text.secondary",
                opacity: 1,
              },
            },
          }}
          {...rest}
        />
      </Box>
    );
  }
);

Input.displayName = "Input";
