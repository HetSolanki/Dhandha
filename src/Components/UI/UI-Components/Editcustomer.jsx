/* eslint-disable react/prop-types */
import { Button } from "@/Components/UI/shadcn-UI/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
import { custom, z } from "zod";
import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "@/Context/CustomerContext";
import { editcustomer } from "@/Handlers/EditcustomerHandler";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomer } from "@/Hooks/fetchCustomer";
import { DropdownMenuItem } from "../shadcn-UI/dropdown-menu";

const formSchema = z.object({
  cname: z.string().min(1, {
    message: "Customer name is required",
  }),
  cphone_number: z
    .string({ message: "Phone number is required" })
    .length(10, { message: "Phone number must contains excatly 10 digits" })
    .regex(/^\d{10}$/, "Phone number must only contain digits"),
  caddress: z.string().min(1, { message: "Customer address is required" }),
  bottle_price: z
    .string()
    .min(1, { message: "Bottle price is required" })
    .regex(/^\d+$/, {
      message: "Only digits are allowed",
    }),
  delivery_sequence_number: z
    .string()
    .min(1, { message: "Delivery sequence number is required" })
    .regex(/^\d+$/, {
      message: "Only digits are allowed",
    }),
});

export function Editcustomer({ id }) {
  const customerDetails = useQuery({
    queryKey: ["customerDetail", id],
    queryFn: fetchCustomer,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
  });

  if (!customerDetails.isLoading) {
    var {
      cname,
      caddress,
      cphone_number,
      delivery_sequence_number,
      bottle_price,
    } = customerDetails.data.data;
  }

  const [_, setCustomersList] = useContext(CustomerContext);

  const formSubmit = async (data) => {
    const newcustomer = await editcustomer(data, id);

    if (newcustomer.status === "success") {
      alert("Customer Edited Successfully");
      setCustomersList(newcustomer);
      form.reset();
    }
  };
  const clearfield = () => {
    form.reset();
  };

  return (
    <>
      <Dialog
        onOpenChange={() => {
          clearfield;
        }}
      >
        <DialogTrigger asChild>
          <button size="sm" className="h-8 gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 30 30"
            >
              <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
            </svg>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(formSubmit)}>
              <DialogHeader>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogDescription>
                  Fill in the form below to edit customer.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2 items-center ">
                  <FormField
                    control={form.control}
                    name="cname"
                    defaultValue={cname}
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
                    defaultValue={cphone_number?.toString()}
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
                            type="text"
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
                    defaultValue={caddress}
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
                    defaultValue={bottle_price?.toString()}
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
                    defaultValue={delivery_sequence_number?.toString()}
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
              <DialogFooter className="flex justify-between">
                <Button type="submit" className="font-semibold">
                  Edit Customer
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
