import { Separator } from "@/Components/UI/shadcn-UI/separator";
import { BankdetailsForm } from "./bankdetails";

export default function SettingsBankDetailsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">
          Bank Details
        </h3>
        <p className="text-sm text-muted-foreground">
          Configure your bank details.
        </p>
      </div>
      <Separator />
      <BankdetailsForm />
    </div>
  )
}
