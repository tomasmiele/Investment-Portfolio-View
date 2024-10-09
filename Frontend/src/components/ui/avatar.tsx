import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
  // @ts-ignore
  >(({ className, ...props }, ref) => (
      <AvatarPrimitive.Root
      ref={ref}
      // @ts-ignore
      className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
        />
    ))
    Avatar.displayName = AvatarPrimitive.Root.displayName
    
    const AvatarImage = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
    // @ts-ignore
    >(({ className, ...props }, ref) => (
        <AvatarPrimitive.Image
        ref={ref}
        // @ts-ignore
        className={cn("aspect-square h-full w-full", className)}
        {...props}
        />
    ))
    AvatarImage.displayName = AvatarPrimitive.Image.displayName
    
    const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
    // @ts-ignore
    >(({ className, ...props }, ref) => (
        <AvatarPrimitive.Fallback
        ref={ref}
        // @ts-ignore
        className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
