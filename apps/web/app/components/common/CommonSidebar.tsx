import * as React from "react";
import {
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  LogOut,
  SearchIcon,
  Settings,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { betterAuthSignout } from "~/server/services/auth/auth-client";

const dummyData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e290",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: ListIcon,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileIcon,
    },
  ],
};

export function CommonSidebar({
  data,
  ...props
}: { data: any } & React.ComponentProps<typeof Sidebar>) {
  const getIsActive = (currentPath: string) => {
    // console.log("currentPath", currentPath);
    // console.log("useLocation().pathname", useLocation().pathname);
    return useLocation().pathname.includes(currentPath);
  };
  if (!data) {
    data = dummyData;
  }

  // start ------------------------------ signout ------------------------------
  const navigate = useNavigate();
  const handleSignout = async () => {
    await betterAuthSignout(navigate);
    console.log("signout");
  };
  // end ------------------------------ signout ------------------------------
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-6">
            {/* Logo at the top */}
            <div className="px-4 py-6 text-center">
              <h2 className="font-semibold text-lg">Logo</h2>
            </div>

            {/* Main navigation items */}
            <SidebarMenu className="flex flex-col w-full px-5 gap-3">
              {data.map((item: any) => (
                <SidebarMenuItem key={item.name}>
                  <Link to={item.to}>
                    <SidebarMenuButton
                      tooltip={item.name}
                      className={`flex items-center gap-5 py-2 px-3 w-full rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        getIsActive(item.to)
                          ? "bg-gray-200 dark:bg-gray-700"
                          : ""
                      }`}
                    >
                      {item.icon && <item.icon size={18} />}
                      <span className="text-xm font-bold">{item.name}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="flex flex-col w-full gap-3 px-8">
          {/* <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Settings"
              className="flex items-center gap-5 py-2 px-3 w-full hover:bg-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Settings size={18} />
              <span className="text-xm font-bold">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={handleSignout}
              className="flex items-center gap-5 py-2 px-3 w-full hover:bg-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 "
            >
              <LogOut size={18} />
              <span className="text-xm font-bold">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
