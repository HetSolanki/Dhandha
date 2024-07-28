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
import { Loader2, Pencil } from "lucide-react";
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
import { useCustomer } from "@/Context/CustomerContext";
import { editcustomer } from "@/Handlers/EditcustomerHandler";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomer } from "@/Hooks/fetchCustomer";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "../shadcn-UI/use-toast";
import { Toaster } from "../shadcn-UI/toaster";
import { useState } from "react";

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

  const [click, setClick] = useState(false);
  const { updateCustomerContext } = useCustomer();
  const { toast } = useToast();

  const formSubmit = async (data) => {
    setClick(true);
    const newcustomer = await editcustomer(data, id);
    if (newcustomer.status === "success") {
      updateCustomerContext();
      toast({
        title: "Success",
        description: "Customer details updated successfully.",
      });
      setClick(false);
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Success",
        description: "Customer details updated successfully.",
      });
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
          <div className="cursor-pointer items-center">
            <Pencil />
          </div>
        </DialogTrigger>
        <DialogContent className="w-[90%] sm:max-w-[425px] rounded-md">
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
              <DialogFooter className="flex-row flex justify-between gap-y-2 sm:gap-y-0">
                {!click ? (
                  <Button type="submit" className="font-semibold">
                    Update Customer
                  </Button>
                ) : (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                )}
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
      <Toaster />
    </>
  );
}
