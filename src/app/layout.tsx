import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { LayoutDashboard, FileText, Gavel, Mail, Bot, Scale, Settings, Flame, AreaChart } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'ClaimGuard',
  description: 'Contest unjustified compensation claims and protect your revenue.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 p-2">
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                    <Flame className="h-6 w-6" />
                </Button>
                <h2 className="text-lg font-semibold tracking-tight text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                  ClaimGuard
                </h2>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={{ children: 'Dashboard' }}>
                    <Link href="/"><LayoutDashboard /><span>Dashboard</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={{ children: 'Analysis' }}>
                    <Link href="/analysis"><AreaChart /><span>Analysis</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={{ children: 'Active Claims' }}>
                    <Link href="/claims"><FileText /><span>Active Claims</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={{ children: 'Submit Dispute' }}>
                    <Link href="/dispute"><Gavel /><span>Submit Dispute</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={{ children: 'Email Templates' }}>
                    <Link href="/templates"><Mail /><span>Email Templates</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={{ children: 'AI Assistant' }}>
                    <Link href="/ai-assistant"><Bot /><span>AI Assistant</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={{ children: 'Legal' }}>
                    <Link href="/legal"><Scale /><span>Legal References</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
               <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{ children: 'Settings' }}>
                        <Link href="/settings"><Settings /><span>Settings</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                     <SidebarMenuButton size="lg" tooltip={{ children: 'Crispy Chicken' }}>
                        <Avatar className="size-8">
                            <AvatarImage src="https://picsum.photos/100" data-ai-hint="logo chicken" alt="Restaurant logo"/>
                            <AvatarFallback>CC</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                            <span className="font-medium">Crispy Chicken</span>
                            <span className="text-xs text-sidebar-foreground/70">Al Mushrif</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
               </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <main className="p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
