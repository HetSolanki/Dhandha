import { Separator } from "@/Components/UI/shadcn-UI/separator";
import { DisplayForm } from "./display-form";

export default function SettingsDisplayPage({ setDefaultRoute }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Display</h3>
        <p className="text-sm text-muted-foreground">
          Set your default display page
        </p>
      </div>
      <Separator />
      <DisplayForm setDefaultRoute={setDefaultRoute} />
    </div>
  )
}
