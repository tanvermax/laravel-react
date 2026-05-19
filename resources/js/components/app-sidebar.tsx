import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    FileText,
    FolderGit2,
    GraduationCap,
    LayoutGrid,
    PlusCircle,
    TrendingUp,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
interface AppSidebarProps {
    userRole?: string;
}
const iconMap: Record<string, any> = {
    LayoutGrid: LayoutGrid,
    BookOpen: BookOpen,
    PlusCircle: PlusCircle,
    Users: Users,
    FileText: FileText,
    GraduationCap: GraduationCap,
    TrendingUp: TrendingUp,

    FolderGit2: FolderGit2,
};

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar({ userRole }: AppSidebarProps) {
    const { props } = usePage<{
        auth: { user: { role: string } };
        menuItems: NavItem[];
    }>();
    const menuItems = (props as any).menuItems || [];

    const getNavItems = (): NavItem[] => {
        const role = userRole || props.auth?.user?.role;

        const commonItems: NavItem[] = [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutGrid,
            },
        ];

        const teacherItems: NavItem[] = [
            {
                title: 'My Class',
                href: '/teacher/classes',
                icon: BookOpen,
            },
           
        ];
        const studentItems: NavItem[] = [
            {
                title: 'My Class',
                href: '/student/enrollments',
                icon: GraduationCap,
       
            
            },
        ];
        if (role === 'teacher') {
            return [...commonItems, ...teacherItems];
        } else if (role === 'student') {
            return [...commonItems, ...studentItems];
        }

        // default case
        return commonItems;
    };
    const mainNavItems = getNavItems();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
