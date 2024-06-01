"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/Components/UI/shadcn-UI/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/UI/shadcn-UI/form";
import { Input } from "@/Components/UI/shadcn-UI/input";
import { useUser } from "@/Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import { updateshop } from "@/Handlers/UpdateShop";

const ShopFormSchema = z.object({
  shop_name: z.string(),
  shop_address: z
    .string()
    .min(2, {
      message: "Address must be at least 2 characters.",
    })
    .max(30, {
      message: "Address must not be longer than 30 characters.",
    }),
});

export function ShopForm() {
  const { user, updateUserContext } = useUser();

  const form = useForm({
    resolver: zodResolver(ShopFormSchema),
  });

  async function onSubmit(data) {
    const uid = user.uid._id;
    console.log("called");
    const updatedUser = await updateshop(data, uid);
    console.log(updatedUser);
    updateUserContext();
    if (updatedUser.status === "success") {
      toast.success("Shop Details Updated Successfully", {
        position: "bottom-right",
        autoClose: 1000,
        theme: "light",
        draggable: true,
      });
      await updateUserContext();
    }
  }

  return (
    
    user && (
      <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="shop_name"
            defaultValue={user?.shop_name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop Name</FormLabel>
                <FormControl>
                  <Input placeholder="Shop Name" {...field} className="w-80" />
                </FormControl>
                <FormDescription>
                  Your shop name should be unique and easy to remember.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shop_address"
            defaultValue={user?.shop_address}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop Address</FormLabel>
                <FormControl>
                  <Input placeholder="Shop Address" {...field} />
                </FormControl>
                <FormDescription>
                  Your shop address should be unique and easy to remember.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Update Shop Details</Button>
        </form>
      </Form>
    <ToastContainer />
    </>
    )
  );
}
