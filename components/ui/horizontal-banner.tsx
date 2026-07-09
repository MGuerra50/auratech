import { DEFAULT_BANNER_IMAGE } from "@/lib/product-images";
import { cn } from "@/lib/utils";

interface HorizontalBannerProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  rounded?: string;
}

export function HorizontalBanner({
  children,
  className,
  contentClassName,
  rounded = "rounded-[2rem]",
}: HorizontalBannerProps) {
  return (
    <div
      className={cn(
        "relative min-w-0 overflow-hidden border border-border bg-cover bg-center bg-no-repeat",
        rounded,
        className,
      )}
      style={{ backgroundImage: `url("${DEFAULT_BANNER_IMAGE}")` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/45" />
      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  );
}
