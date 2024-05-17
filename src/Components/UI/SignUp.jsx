import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { createUser } from "../../Handlers/SignUpHandler";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const formSubmit = async (data) => {
    console.log(data);
    const newUser = await createUser(data);

    if (newUser.status === "success") {
      toast.success("Registered Successfully", {
        position: "top-right",
        autoClose: 2000,
        draggable: true,
        closeOnClick: true,
        theme: "light",
        onClose: () => {
          navigate("/");
        },
      });
      localStorage.setItem("token", newUser.token);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(formSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={errors.phone_number}
                    required
                    fullWidth
                    id="phone_number"
                    label="Phone Number"
                    name="phone_number"
                    autoComplete="Phone Number"
                    {...register("phone_number", {
                      required: "Phone Number is required",
                    })}
                  />
                  {errors.phone_number && (
                    <p className="error">{errors.phone_number.message}</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.email}
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="Email"
                    {...register("email", {
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="error">{errors.email.message}</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.password}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    autoComplete="new-password"
                  />
                  {errors.password && (
                    <p className="error">{errors.password.message}</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.confirmPassword}
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) => {
                        return value === password || "Passwords do not match";
                      },
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword.message}</p>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}
