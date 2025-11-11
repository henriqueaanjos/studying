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
import { Home, LibraryBig, ListChecks, LogOut, Notebook } from "lucide-react"
import { ModeToggle } from "./ToggleMode";
import { Logo } from "./Logo";
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

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
    // {
    //     title: "Calendário",
    //     url: "#",
    //     icon: Calendar,
    // },
    // {
    //     title: "Planejamento",
    //     url: "Planner",
    //     icon: LandPlot,
    // },
]

export function AppSidebar() {
    const { open } = useSidebar();

     const { user, signOut } = useAuth();

    async function handleSignOut() {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    }

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
            <SidebarFooter className='flex flex-col items-center mb-4'>
                <ModeToggle isSideBarOpen={open}/>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex flex-row items-center gap-2 cursor-pointer">
                            <Image
                                src={`https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(user.name)}&text=random`}
                                alt="Avatar"
                                width={40}
                                height={40}
                                className="rounded-full border"
                                unoptimized
                            />
                            {open && <h1 className="font-black text-sm whitespace-nowrap text-white">{user.name}</h1>}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={handleSignOut}>
                            <LogOut size={16} className="mr-2" />
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    )
}