import { Separator } from "../../../UI/shadcn-UI/separator";
import { ShopForm } from "./Shopdetails-form"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Shop Details</h3>
        <p className="text-sm text-muted-foreground">
          Update your shop details
        </p>
      </div>
      <Separator />
      <ShopForm />
    </div>
  )
}
