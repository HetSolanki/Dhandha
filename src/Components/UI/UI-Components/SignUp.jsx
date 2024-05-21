import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../shadcn-UI/button";
import { createUser } from "@/Handlers/SignUpHandler";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
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
  // Label,
  FormMessage,
} from "@/Components/UI/shadcn-UI/form";
import { Input } from "../shadcn-UI/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../shadcn-UI/label";

const formSchema = z.object({
  fname: z.string({
    message: "First Name is required",
  }),
  lname: z.string({
    message: "Last Name is required",
  }),
  phone_number: z
    .string({
      message: "Phone Number is required",
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
  confirm_password: z
    .string({
      message: "Confirm Password is required",
    })
});

export default function SignUp() {

  const checkValidation = (data) => {
    if (data.password !== data.confirm_password) {
      form.setError("confirm_password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return false;
    }
    return true;
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const formSubmit = async (data) => {
    console.log(data);
    if (!checkValidation(data)) {
      return;
    } else {
      console.log("Validation Passed");
    }
    const newUser = await createUser(data);
    console.log(newUser)

    if (newUser.status === "success") {
      toast.success("Registered Successfully", {
        position: "top-right",
        autoClose: 2000,
        draggable: true,
        closeOnClick: true,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      localStorage.setItem("token", newUser.token);
    }
    else if (newUser.status === "failed") {
      toast.error("User already exists", {
        position: "top-right",
        autoClose: 2000,
        draggable: true,
        closeOnClick: true,
        theme: "light",
      });
    }
    else {
      toast.error("Error", {
        position: "top-right",
        autoClose: 2000,
        draggable: true,
        closeOnClick: true,
        theme: "light",
      });
    }
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)}>
            <Card className="mx-auto max-w-sm">
              <CardHeader>
                <CardTitle className="text-xl font-[700]">Sign Up</CardTitle>
                <CardDescription>
                  Enter your information to create an account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="fname"
                        render={({ field }) => (
                          <FormItem>
                            <Label
                              htmlFor="first-name"
                              className="font-semibold"
                            >
                              First name
                            </Label>
                            <FormControl>
                              <Input
                                id="first-name"
                                placeholder="Max"
                                {...field}
                                className={
                                  form.formState.errors.fname
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
                        name="lname"
                        render={({ field }) => (
                          <FormItem>
                            <Label
                              htmlFor="last-name"
                              className="font-semibold"
                            >
                              Last name
                            </Label>
                            <FormControl>
                              <Input
                                id="last-name"
                                placeholder="Robinson"
                                {...field}
                                className={
                                  form.formState.errors.lname
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
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="phone_number"
                      render={({ field }) => (
                        <FormItem>
                          <Label
                            htmlFor="phone_number"
                            className="font-semibold"
                          >
                            Phone Number
                          </Label>
                          <FormControl>
                            <Input
                              id="phone_number"
                              type="text"
                              placeholder="Phone Number"
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="email" className="font-semibold">
                            Email
                          </Label>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Email Address (Optional)"
                              {...field}
                              className={
                                form.formState.errors.email
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
                          <Label htmlFor="password" className="font-semibold">
                            Password
                          </Label>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Password"
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
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem>
                          <Label
                            htmlFor="confirm_password"
                            className="font-semibold"
                          >
                            Confirm Password
                          </Label>
                          <FormControl>
                            <Input
                              id="confirm_password"
                              type="password"
                              placeholder="Confirm Password"
                              {...field}
                              className={
                                form.formState.errors.confirm_password
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
                  <Button type="submit" className="w-full font-semibold">
                    Create an account
                  </Button>
                  <Button variant="outline" className="w-full font-semibold">
                    Sign up with GitHub
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm font-medium">
                  Already have an account?{" "}
                  <Link to="/signin" className="underline">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
      <ToastContainer />
    </>
  );
}
