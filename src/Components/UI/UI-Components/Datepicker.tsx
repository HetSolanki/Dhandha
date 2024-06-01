"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/UI/shadcn-UI/button"
import { Calendar } from "@/Components/UI/shadcn-UI/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/UI/shadcn-UI/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/UI/shadcn-UI/popover"
import { useContext } from "react"
import CustomerEntryContext from "@/Context/CustomerEntryContext"

const FormSchema = z.object({
  delivery_date: z.date({
    required_error: "A date of birth is required.",
  }),
})

export function DatePickerForm() {

  const {customers, setCustomers} = useContext(CustomerEntryContext)

  const token = localStorage.getItem("token");
  const getData = async (date) => {
    const customers = await fetch(
      `http://localhost:3001/api/customerentry/getallcustomerentrybydate/${date}`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    const res = await customers.json();
    if (res.status === "success") {
      console.log(res.data);
      setCustomers(res.data)
    }
    else {
      console.log(res)
    }
  }
  const getdeliverydateData = (date) => {
      // getData("2024-05-29")
    getData(format(date, "yyyy-MM-dd"))
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="delivery_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              {/* <FormLabel>Date of birth</FormLabel> */}
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={
                      (date) => {
                        form.setValue("delivery_date", date)
                        getdeliverydateData(date)
                      }
                    }
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                select a date to view the customer entry
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  )
}
