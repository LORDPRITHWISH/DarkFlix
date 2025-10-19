// components/ui/Breadcrumbs.tsx
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  path: string; // e.g. "movie/intresting/fine"
  basePath?: string; // optional prefix for routes
}

export default function Breadcrumbs({ path, basePath = "/" }: BreadcrumbsProps) {
  if (!path) return null;

  const parts = path.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parts.map((part, i) => {
          const isLast = i === parts.length - 1;
          const href =
            basePath +
            parts
              .slice(0, i + 1)
              .join("/")
              .replace(/\/+/g, "/");

          const label = part
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <BreadcrumbItem key={href}>
              {!isLast ? (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={href}>{label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </BreadcrumbSeparator>
                </>
              ) : (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
