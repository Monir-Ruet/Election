import type { Metadata } from "next";
import "./../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers"
import { NavigationMenuBar } from "@/components/nav-menu-bar";

export const metadata: Metadata = {
    title: "Bangladesh Election Commission",
    description: "Election Dapp for Bangladesh Election Commission",
};

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="w-full flex flex-col">
                <div className="w-full fixed backdrop-blur-md p-5">
                    <NavigationMenuBar />
                </div>
                <div className="mt-16 p-5">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}
