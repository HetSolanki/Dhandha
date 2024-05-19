import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { signinuser } from "@/Handlers/SignInHandler";
import { toast } from "../shadcn-UI/use-toast";
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
  FormLabel,
  FormMessage,
} from "@/Components/UI/shadcn-UI/form";

import { Toaster } from "../shadcn-UI/toaster";
import { Input } from "../shadcn-UI/input";
import { Label } from "../shadcn-UI/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  phone_number: z
    .string({
      message: "Username is required",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(2, {
      message: "Password must be at least 2 characters.",
    }),
});

export default function SignIn() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

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
    console.log(data);
    const signin = await signinuser(data);

    console.log(signin);

    if (signin.success === true) {
      toast({
        title: "Success!",
        description: "Login Successfully",
        variant: "default",
        duration: 2000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      localStorage.setItem("token", signin.token);
      phone_numberInput = data.phone_number;
      passwordInput = data.password;
      console.log(phone_numberInput);
      lsRememberMe(phone_numberInput, passwordInput);
    } else if (signin.data === "Invalid Credentials") {
      toast({
        title: "Error",
        description: "Invalid Credentials",
        variant: "destructive",
        duration: 2000,
      });
    } else if (signin.data === "Invalid Username") {
      toast({
        title: "Error",
        description: "Invalid Username",
        variant: "destructive",
        duration: 2000,
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
                          <FormLabel className="font-semibold">
                            Username
                          </FormLabel>
                          <FormControl>
                            <Input name="phone_number" {...field} />
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
                          <FormLabel>
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
                          </FormLabel>
                          <FormControl>
                            <Input id="password" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-x-1">
                    <input
                      type="checkbox"
                      value="remember"
                      checked={rmCheck}
                      onChange={handlecheckchange}
                    />
                    <span className="mb-[.1rem]">Remember me</span>
                  </div>
                  <Button type="submit" className="w-full font-semibold">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full font-semibold">
                    Login with Google
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
        <Toaster />
      </div>
    </>
  );
}
