import { Button } from "@/Components/UI/shadcn-UI/button";
import { ToastContainer, toast } from "react-toastify";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/UI/shadcn-UI/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/UI/shadcn-UI/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pages = [
  {
    label: "Dashboard",
    value: "dashboard",
  },
  {
    label: "Customers",
    value: "customers",
  },
  {
    label: "CustomerEntry",
    value: "customerentry",
  },
  {
    label: "CustomerEntryData",
    value: "customerentrydata",
  },
];

export function DisplayForm({ setDefaultRoute }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const dropbox = document.getElementById("DefaulPage");
  const checkvalidation = () => {
    // console.log(value);
    if (dropbox.outerText === "Select Default Page...") {
      toast.error("Please select a Default Page", {
        position: "bottom-right",
        autoClose: 1000,
        theme: "light",
        draggable: true,
      });
      dropbox.focus();
      dropbox.style.border = "1px solid red";
      dropbox.style.borderRadius = "5px";
      return false;
    } else {
      dropbox.style.border = "1px solid green";
      dropbox.style.borderRadius = "5px";
      return true;
    }
  };

  const handledisplaysubmit = () => {
    if (checkvalidation()) {
      const newDefaultRoute = `/${value}`;
      localStorage.setItem("defaultRoute", newDefaultRoute);
      setDefaultRoute(newDefaultRoute);

      toast.success("Default Page Updated Successfully", {
        position: "bottom-right",
        autoClose: 1000,
        theme: "light",
        draggable: true,
      });
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            id="DefaulPage"
          >
            {value
              ? Pages.find((Page) => Page.value === value)?.label
              : "Select Default Page..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Page..." />
            <CommandList>
              <CommandEmpty>No Page found.</CommandEmpty>
              <CommandGroup>
                {Pages.map((Page) => (
                  <CommandItem
                    key={Page.value}
                    value={Page.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === Page.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {Page.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="
        flex
        space-x-4
        mt-4
      ">
        <Button type="submit" onClick={handledisplaysubmit}>
          Set DefaltPage
        </Button>
        <Button type="submit" onClick={() => navigate("/")}>
          Go to DefaltPage
        </Button>
      </div>

      <ToastContainer />
    </>
  );
}
