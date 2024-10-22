import { Button } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({
  buttonText,
  description,
  href,
  title,
}: iAppProps) {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mx-auto mb-8 mt-2 max-w-sm text-center text-sm leading-tight text-muted-foreground">
        {description}
      </p>

      <Button asChild className="">
        <Link href={href}>
          <PlusCircle className="mr-2 size-4" /> {buttonText}
        </Link>
      </Button>
    </div>
  );
}
