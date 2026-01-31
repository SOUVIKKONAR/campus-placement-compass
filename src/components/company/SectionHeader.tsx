import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  className?: string;
}

export function SectionHeader({ icon: Icon, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("section-header", className)}>
      <Icon className="section-icon" />
      <h3 className="section-title">{title}</h3>
    </div>
  );
}
