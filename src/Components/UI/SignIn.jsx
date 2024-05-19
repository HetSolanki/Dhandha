import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signinuser } from "../../Handlers/SignInHandler";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Button } from "@/Components/UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/UI/card";
import { Input } from "@/Components/UI/input";
import { Label } from "@/Components/UI/label";

const defaultTheme = createTheme();

export default function SignIn() {
  const [cookies, setCookie] = useCookies(["token"]);
  let phone_numberInput = document.getElementById("phone_number");
  let passwordInput = document.getElementById("password");
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  }, []);

  const formSubmit = async (data) => {
    const signin = await signinuser(data);

    console.log(signin);

    if (signin.success === true) {
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 2000,
        draggable: true,
        closeOnClick: true,
        theme: "light",
        onClose: () => {
          navigate("/dashboard");
        },
      });
      localStorage.setItem("token", signin.token);
      phone_numberInput = data.phone_number;
      passwordInput = data.password;
      console.log(phone_numberInput);
      lsRememberMe(phone_numberInput, passwordInput);
    } else if (signin.data === "Invalid Credentials") {
      toast.error("Invalid Credentials", {
        position: "top-right",
        autoClose: 2000,
        draggable: true,
        closeOnClick: true,
        theme: "light",
      });
    } else if (signin.data === "Invalid Username") {
      toast.error("Invalid Username", {
        position: "top-right",
        autoClose: 2000,
        draggable: true,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  const [rmCheck, setRmCheck] = useState(false);
  const handlecheckchange = (event) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      setRmCheck(true);
    } else {
      setRmCheck(false);
    }
  };

  const lsRememberMe = (phone_number, password) => {
    let expiresdate = new Date();
    expiresdate.setTime(expiresdate.getTime() + 30 * 24 * 60 * 60 * 1000);

    if (
      rmCheck === true &&
      phone_number.value !== "" &&
      password.value !== ""
    ) {
      setCookie("token", localStorage.getItem("token"), {
        path: "/",
        expires: expiresdate,
      });
      console.log("Cookies Set");
      console.log(cookies.username);
    } else {
      console.log("Not checked");
    }
  };
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
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone_number"
                    label="phone_number"
                    name="phone_number"
                    error={errors.phone_number}
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
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    error={errors.password}
                  />
                  {errors.password && (
                    <p className="error">{errors.password.message}</p>
                  )}
                </Grid>
              </Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    checked={rmCheck}
                    onChange={handlecheckchange}
                    color="primary"
                  />
                }
                label="Remember me"
              />
             
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your phone Number below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent onSubmit={handleSubmit(formSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Phone Number</Label>
              <Input
                type="number"
                placeholder="+91 1234567890"
                required
                id="phone_number"
                label="phone_number"
                name="phone_number"
                error={errors.phone_number}
                autoComplete="Phone Number"
                {...register("phone_number", {
                  required: "Phone Number is required",
                })}
              />
              {errors.phone_number && (
                <p className="error">{errors.phone_number.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                type="password"
                required
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={errors.password}
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <input type="checkbox" />
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>

      <ToastContainer />
    </>
  );
}
