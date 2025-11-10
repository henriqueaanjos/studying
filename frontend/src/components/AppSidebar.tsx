"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from './ui/sidebar'
import { Calendar, Home, LandPlot, LibraryBig, ListChecks, Notebook } from "lucide-react"
import { ModeToggle } from "./ToggleMode";
import { Logo } from "./Logo";
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const items = [
    {
        title: "Home",
        url: "Home",
        icon: Home,
    },
    {
        title: "Hoje",
        url: "Today",
        icon: ListChecks,
    },
    {
        title: "Registros",
        url: "Register",
        icon: Notebook,
    },
    {
        title: "Acompanhamento",
        url: "Monitoring",
        icon: LibraryBig,
    },
    {
        title: "Calendário",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Planejamento",
        url: "Planner",
        icon: LandPlot,
    },
]

export function AppSidebar() {
    const { open } = useSidebar();
    return (
        <Sidebar collapsible="icon" >
            <SidebarHeader>
                <Logo short={!open}/>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="hover:bg-sidebar-menu-hover text-white hover:text-white">
                                        <Link href={item.url}>
                                            <Tooltip >
                                                <TooltipTrigger>
                                                <item.icon size={16} fontWeight={2} />
                                                </TooltipTrigger>
                                                <TooltipContent side='left'>
                                                    <span>{item.title}</span>
                                                </TooltipContent>
                                            </Tooltip>
                                            <span className="uppercase text-xxs font-black">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter >
                <ModeToggle/>
            </SidebarFooter>
        </Sidebar>
    )
}