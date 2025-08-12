import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { LogOut } from "lucide-react"
import { Button } from "./ui/button"

export function NavigationMenuBar({ className }: { className?: string }) {
    return (
        <div className="flex flex-row items-center">
            <NavigationMenu viewport={false} className={cn("gap-3", className)}>
                <SidebarTrigger />
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href={"/"}>Home</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>

    )
}
