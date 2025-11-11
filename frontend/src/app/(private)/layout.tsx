import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContestContextProvider } from "@/context/ContestContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider defaultOpen={false}>
            <ContestContextProvider>
                <AppSidebar />
                <main className="w-full">
                    <SidebarTrigger />
                    {children}
                </main>
            </ContestContextProvider>
        </SidebarProvider>
    );
}
