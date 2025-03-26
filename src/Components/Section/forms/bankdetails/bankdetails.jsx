import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/UI/shadcn-UI/form";
import { Input } from "@/Components/UI/shadcn-UI/input";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "@/Context/UserContext";
import { Button } from "@/Components/UI/shadcn-UI/button";
import { updateUser } from "@/Handlers/UpdateUser";

const bankdetailsFormSchema = z.object({
  branch_ifsc_code: z.string(),
  account_number: z.string(),
  benificiary_name: z.string(),
});

export function BankdetailsForm() {
  const { user, updateUserContext } = useUser();

  const form = useForm({
    resolver: zodResolver(bankdetailsFormSchema),
  });

  async function formSubmit(data) {
    const uid = user.uid._id;
    const updatedUser = await updateUser(data, uid);
    if (updatedUser.status === "success") {
      await updateUserContext();
      toast.success("User Updated Successfully", {
        position: "bottom-right",
        autoClose: 1000,
        theme: "light",
        draggable: true,
      });
    }
  }

  return (
    user && (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="branch_ifsc_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch IFSC Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Branch IFSC Code
"
                      {...field}
                      className="w-80"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Account Number
"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="benificiary_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beneficiary Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Beneficiary Name"
                      {...field}
                      className="w-80"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Request For Verify Bank Details</Button>
          </form>
        </Form>
        <ToastContainer />
      </>
    )
  );
}
