import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { props } = usePage();
    const userRole = (props.auth as any)?.user?.role;
    
    return (
        <SidebarProvider>
            <AppSidebar userRole={userRole} />
            <SidebarInset>
                <main className="flex-1 p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}