import { GraduationCap, Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:hidden">
      <SidebarTrigger className="-ml-1">
        <Menu className="h-5 w-5" />
      </SidebarTrigger>
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
          <GraduationCap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-sm">SRM Placement Intelligence</span>
      </div>
    </header>
  );
}
