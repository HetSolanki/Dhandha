import { Button } from "@/Components/UI/shadcn-UI/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/UI/shadcn-UI/dialog";
import { Input } from "@/Components/UI/shadcn-UI/input";
import { PlusCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn-UI/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addcustomer } from "@/Handlers/AddcustomerHandler";
import { useState } from "react";

const formSchema = z.object({
  cname: z.string({
    message: "Customer Name is required",
  }),
  cphone_number: z
    .string({
      message: "Phone Number is required",
    })
    .max(10, {
      message: "Phone Number must be of 10 digits",
    }),
  caddress: z.string({
    message: "Address is required",
  }),
  bottle_price: z.string({
    message: "Bottle Price is required",
  }),
  delivery_sequence_number: z.string({
    message: "Delivery Sequence Number is required",
  }),
});

export function Addcustomer() { 
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const formSubmit = async (data) => {
    console.log(data);
    const newcustomer = await addcustomer(data);

    if (newcustomer.status === "success") {
      alert("Customer Added Successfully");
      form.reset();
      
    }
  };
  const clearfield = () => {
    form.reset();
  };

  return (
    <Dialog
      onOpenChange={() => {
        clearfield;
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Customer
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Fill in the form below to add a new customer.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2 items-center ">
                <FormField
                  control={form.control}
                  name="cname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cname" className="font-semibold">
                        Customer Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="cname"
                          type="text"
                          placeholder="Customer Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2 items-center ">
                <FormField
                  control={form.control}
                  name="cphone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="cphone_number"
                        className="font-semibold"
                      >
                        Customer Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="cphone_number"
                          type="number"
                          placeholder="Customer Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2 items-center ">
                <FormField
                  control={form.control}
                  name="caddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="caddress" className="font-semibold">
                        Customer Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="caddress"
                          type="text"
                          placeholder="Customer Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2 items-center ">
                <FormField
                  control={form.control}
                  name="bottle_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="bottle_price"
                        className="font-semibold"
                      >
                        Bottle Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="bottle_price"
                          type="text"
                          placeholder="Bottle Price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2 items-center ">
                <FormField
                  control={form.control}
                  name="delivery_sequence_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="delivery_sequence_number"
                        className="font-semibold"
                      >
                        Delivery Sequence Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="delivery_sequence_number"
                          type="text"
                          placeholder="Delivery Sequence Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Customer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
