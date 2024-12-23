"use client";

import { ReactNode } from "react";
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

type TooltipProps = {
  trigger: ReactNode;
  text: string;
  side?: "top" | "bottom" | "left" | "right";
} & React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;


// eslint-disable-next-line react/display-name
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref) => {
    const { sideOffset = 8, trigger, text, side = "top" } = props;
    return (
      <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              className="transition-all !z-[99999999] overflow-hidden rounded bg-slate-800 px-2 py-1 text-[12px] font-[450] text-white"
              sideOffset={sideOffset}
              ref={ref}
              {...props}
              side={side}
            >
              {text}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  },
);
