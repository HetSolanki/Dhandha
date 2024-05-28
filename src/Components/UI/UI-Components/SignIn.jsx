import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import { signinuser } from "@/Handlers/SignInHandler";
import { useForm } from "react-hook-form";
import { Button } from "../shadcn-UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shadcn-UI/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/Components/UI/shadcn-UI/form";
import { Input } from "../shadcn-UI/input";
import { Label } from "../shadcn-UI/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@/Context/UserContext";

const formSchema = z.object({
  phone_number: z
    .string({
      message: "Phone Number is required",
    })
    .min(10, {
      message: "Phone Number must be of 10 digits",
    })
    .max(10, {
      message: "Phone Number must be of 10 digits",
    })
    .regex(/^[0-9]*$/, {
      message: "Phone Number must be numeric",
    }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(20, {
      message: "Password must be at most 20 characters",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/^(?=.*[a-z])/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least one number",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least one special character",
    }),
});

export default function SignIn() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // const [cookies, setCookie] = useCookies(["token"]);
  let phone_numberInput = document.getElementById("phone_number");
  let passwordInput = document.getElementById("password");
  const navigate = useNavigate();
  const { updateUserContext } = useUser();

  // useEffect(() => {
  //   if (cookies.token) {
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/signin");
  //   }
  // }, []);

  const formSubmit = async (data) => {
    const signin = await signinuser(data);

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

      localStorage.setItem("token", signin.token);
      localStorage.setItem("cid", signin.cid);

      updateUserContext();

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
    } else if (signin.data === "Invalid Phone Number") {
      toast.error("Invalid Phone Number", {
        position: "top-right",
        autoClose: 2000,
        draggable: true,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

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
      // setCookie("token", localStorage.getItem("token"), {
      //   path: "/",
      //   expires: expiresdate,
      // });
      console.log("Cookies Set");
    } else {
      console.log("Not checked");
    }
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)}>
            <Card className="mx-auto max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-[700]">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="phone_number"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="font-semibold">Phone Number</Label>
                          <FormControl>
                            <Input
                              name="phone_number"
                              {...field}
                              className={
                                form.formState.errors.phone_number
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <Label>
                            <div className="flex items-center">
                              <Label
                                htmlFor="password"
                                className="font-semibold"
                              >
                                Password
                              </Label>
                              <Link
                                to="#"
                                className="ml-auto inline-block text-sm underline"
                              >
                                Forgot your password?
                              </Link>
                            </div>
                          </Label>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              {...field}
                              className={
                                form.formState.errors.password
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <div className="flex items-center gap-x-1">
                    <input
                      type="checkbox"
                      value="remember"
                      checked={rmCheck}
                      onChange={handlecheckchange}
                    />
                    <span className="mb-[.1rem]">Remember me</span>
                  </div> */}
                  <Button type="submit" className="w-full font-semibold">
                    Sign in
                  </Button>
                  <Button variant="outline" className="w-full font-semibold">
                    Signin with Google
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm font-medium">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="underline font-medium">
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
        <ToastContainer />
      </div>
    </>
  );
}
