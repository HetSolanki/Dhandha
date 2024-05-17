import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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


const defaultTheme = createTheme();

export default function SignIn() {
  const [cookies, setCookie] = useCookies(['username'])
  let phone_numberInput = document.getElementById("phone_number");
  let passwordInput = document.getElementById("password");
  const navigate = useNavigate();

//   console.log(get('username'))
 useEffect(() => {
  if(cookies.username) {
    navigate("/");
  }else{
    navigate("/signin");
  }
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
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
          navigate("/");
        },
      });
      phone_numberInput = data.get("phone_number");
      passwordInput = data.get("password");
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

    console.log({
      phone_number: data.get("phone_number"),
      password: data.get("password"),
      success: signin.success,
    });
  };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  
  const [rmCheck, setRmCheck] = useState(false);
  const handlecheckchange = (event) => {
    console.log(event.target.checked)
    if (event.target.checked) {
      setRmCheck(true);
    }
    else {
      setRmCheck(false);
    }
  };

  const lsRememberMe =  (phone_number, password) => {
    console.log(rmCheck)
    if (rmCheck === true && phone_number.value !== "" && password.value !== "") {
      setCookie('username',phone_number,{ path: '/', expires: new Date(Date.now() + 900000)})
      console.log("Cookies Set")
      console.log(cookies.username)
    } else {
      console.log("Not checked")
    }
  }
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone_number"
                label="phone_number"
                name="phone_number"
                // autoFocus
                // error={errors.phone_number}
                autoComplete="Phone Number"
                //   {...register("phone_number", {
                //     required: "Phone Number is required",
                //   })}
              />
              {/* //  {errors.phone_number && (
              //       <p className="error">{errors.phone_number.message}</p>
              //     )} */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                // {...register("password", {
                //   required: "Password is required",
                // })}
                // error={errors.password}
              />
              {/* {errors.password && (
                    <p className="error">{errors.password.message}</p>
                  )} */}
              <FormControlLabel
                control={<Checkbox value="remember" checked={rmCheck} onChange={handlecheckchange} color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
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
      <ToastContainer />
    </>
  );
}
