"use client";

import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "../../UI/shadcn-UI/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../UI/shadcn-UI/form";
import { Input } from "../../UI/shadcn-UI/input";
import { Textarea } from "../../UI/shadcn-UI/textarea";
import { toast } from "../../UI/shadcn-UI/use-toast";

const profileFormSchema = z.object({
  username:
    z.string({
      required_error: "Please enter a username.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
    fname: z.string({
      message: "First Name is required",
    }),
    lname: z.string({
      message: "Last Name is required",
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

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
  urls: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full mt-4">
          <div className="flex flex-col justify-between items-start w-full">
            <FormField
              control={form.control}
              name="fname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed on your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col justify-between items-start w-full">
            <FormField
              control={form.control}
              name="lname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed on your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
          </div>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field}
                  disabled
                />
              </FormControl>
              <FormDescription>
                This is the Phone Number that will be displayed on your profile and in search results.
                and <b>it can't be changed.</b>
              </FormDescription>

            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email"
                  {...field} />
              </FormControl>
              <FormDescription>
                You can change your email address at any time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full mt-4">
          <div className="flex flex-col justify-between items-start w-full">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose a strong password to protect your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>        
              
            <Button type="submit">Update profile</Button>
          </form>
        </Form>
        );
}
