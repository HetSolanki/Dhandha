import { useNavigate } from "react-router-dom";
import { Separator } from "../../UI/shadcn-UI/separator";
import { ProfileForm } from "./profile-form";
import { useEffect } from "react";

export default function SettingsProfilePage() {

  
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);


  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
