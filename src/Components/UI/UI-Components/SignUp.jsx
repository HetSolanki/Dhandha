import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../shadcn-UI/button";
import { createUser } from "@/Handlers/SignUpHandler";
import { toast } from "../shadcn-UI/use-toast";
import { Toaster } from "../shadcn-UI/toaster";
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
  FormLabel,
  FormMessage,
} from "@/Components/UI/shadcn-UI/form";
import { Input } from "../shadcn-UI/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
    }),
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Email format is not valid",
    }),
  password: z.string({
    message: "Password is required",
  }),
});

export default function SignUp() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const formSubmit = async (data) => {
    console.log(data);
    const newUser = await createUser(data);

    if (newUser.status === "success") {
      toast({
        title: "Success!",
        description: "Registered Successfully",
        variant: "default",
        duration: 2000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      localStorage.setItem("token", newUser.token);
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
                            <FormLabel
                              htmlFor="first-name"
                              className="font-semibold"
                            >
                              First name
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="first-name"
                                placeholder="Max"
                                {...field}
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
                            <FormLabel
                              htmlFor="last-name"
                              className="font-semibold"
                            >
                              Last name
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="last-name"
                                placeholder="Robinson"
                                {...field}
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
                          <FormLabel
                            htmlFor="phone_number"
                            className="font-semibold"
                          >
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="phone_number"
                              type="text"
                              placeholder="Phone Number"
                              {...field}
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
                          <FormLabel htmlFor="email" className="font-semibold">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              placeholder="m@example.com"
                              {...field}
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
                          <FormLabel
                            htmlFor="password"
                            className="font-semibold"
                          >
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input id="password" type="password" {...field} />
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
      <Toaster />
    </>
  );
}
