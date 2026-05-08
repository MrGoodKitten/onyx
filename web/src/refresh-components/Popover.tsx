"use client";

import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import Separator from "@/refresh-components/Separator";
import ShadowDiv from "@/refresh-components/ShadowDiv";
import { WithoutStyles } from "@/types";
import { Section } from "@/layouts/general-layouts";

const PopoverRoot = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverClose = PopoverPrimitive.Close;

type PopoverWidths = "fit" | "md" | "lg" | "xl" | "trigger";

const widthClasses: Record<PopoverWidths, string> = {
  fit: "w-fit",
  md: "w-[12rem]",
  lg: "w-[15rem]",
  xl: "w-[18rem]",
  trigger: "w-[var(--radix-popover-trigger-width)]",
};

type PopoverContentProps = WithoutStyles<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
> & {
  width?: PopoverWidths;
};

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ width = "fit", align = "center", sideOffset = 4, ...props }, ref) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={8}
        className={cn(
          "bg-background-neutral-00 p-1 z-popover rounded-12 overflow-hidden border shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "max-h-[var(--radix-popover-content-available-height)]",
          widthClasses[width]
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = "PopoverContent";

function SeparatorHelper() {
  return <Separator className="py-0 px-2" />;
}

export interface PopoverMenuProps {
  children?: React.ReactNode;
  footer?: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export function PopoverMenu({
  children,
  footer,
  scrollContainerRef,
}: PopoverMenuProps) {
  if (!children) return null;

  const childArray = React.Children.toArray(children).filter(
    (child) => child !== undefined && child !== false
  );

  const filteredChildren = childArray.filter((child, index) => {
    if (child !== null) return true;
    return index !== 0 && index !== childArray.length - 1;
  });

  return (
    <Section alignItems="stretch">
      <ShadowDiv
        scrollContainerRef={scrollContainerRef}
        className="flex flex-col gap-1 max-h-[20rem] w-full"
      >
        {filteredChildren.map((child, index) => (
          <div key={index}>
            {child === null ? <SeparatorHelper /> : child}
          </div>
        ))}
      </ShadowDiv>
      {footer && (
        <>
          <SeparatorHelper />
          {footer}
        </>
      )}
    </Section>
  );
}

const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Content: PopoverContent,
  Close: PopoverClose,
  Menu: PopoverMenu,
});

export default Popover;
