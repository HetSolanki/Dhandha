/* eslint-disable react/prop-types */
import { Separator } from "../../UI/shadcn-UI/separator";
import Navbar from "../Navbar";
import { SidebarNav } from "./components/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Shop Details",
    href: "/shopdetails",
  },
  // {
  //   title: "Bank Details",
  //   href: "/bankdetails",
  // },
  // {
  //   title: "Notifications",
  //   href: "/notifications-settings",
  // },
  {
    title: "Display",
    href: "/displaydetails",
  },
];

export default function SettingsLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-7 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
