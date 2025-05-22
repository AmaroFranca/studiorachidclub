
import * as React from "react";
import { DialogOverlay } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Custom DialogOverlay with blur effect that can be shared across all dialogs
export const BlurDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogOverlay>,
  React.ComponentPropsWithoutRef<typeof DialogOverlay>
>(({ className, ...props }, ref) => (
  <DialogOverlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
BlurDialogOverlay.displayName = "BlurDialogOverlay";
