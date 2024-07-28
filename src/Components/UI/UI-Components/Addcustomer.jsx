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
import { z } from "zod";
import { addcustomer } from "@/Handlers/AddcustomerHandler";
import { useCustomer } from "@/Context/CustomerContext";
import { useUser } from "@/Context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z.object({
  cname: z
    .string({
      message: "Customer name is required",
    })
    .min(1, {
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
    .string({ message: "Delivery sequence number is required" })
    .min(1, { message: "Delivery sequence number is required" })
    .regex(/^\d+$/, {
      message: "Only digits are allowed",
    }),
});

export function Addcustomer() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const { updateCustomerContext } = useCustomer();
  const { user } = useUser();

  const formSubmit = async (data) => {
    const newcustomer = await addcustomer(data, user.uid._id);

    if (newcustomer.status === "success") {
      toast.success("Customer Added Successfully", {
        position: "bottom-right",
        autoClose: 1000,
        theme: "light",
        draggable: true,
      });
      updateCustomerContext();
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
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Customer
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90%] sm:max-w-[425px] rounded-md">
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
              <DialogFooter className="flex-row flex justify-between">
                <Button type="submit" className="font-semibold">
                  Add Customer
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
