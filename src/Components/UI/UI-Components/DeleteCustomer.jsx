/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useCustomer } from "@/Context/CustomerContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/UI/shadcn-UI/alert-dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2 } from "lucide-react";

const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export default function DeleteCustomer({ cid }) {
  const { updateCustomerContext } = useCustomer();

  const deleteRecord = async (cid) => {
    const deletedCustomer = await fetch(
      `${DOMAIN_NAME}/api/customers/customer/${cid}`,
      {
        method: "DELETE",
      }
    );
    const res = await deletedCustomer.json();
    if (res.status === "success") {
      toast.success("Customer Delete Successfully", {
        position: "bottom-right",
        autoClose: 1000,
        theme: "light",
        draggable: true,
      });
      updateCustomerContext();
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div>
            <Trash2 />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[90%] rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this customer?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              customer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col">
            <AlertDialogAction onClick={() => deleteRecord(cid)}>
              Delete
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <ToastContainer /> */}
    </>
  );
}
