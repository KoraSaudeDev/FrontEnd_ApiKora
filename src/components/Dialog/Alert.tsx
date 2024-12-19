"use client";

import React from "react";
import * as DialogPrimitives from "@radix-ui/react-dialog";
import { MdError } from "react-icons/md";
// import { Button, Icon, Spinner, Text, Title } from "@/components/ui";

export interface AlertProps {
  title: string;
  text: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

// const classes = tv({
//   slots: {
//     container:
//       "",
//     box: "",
//     content: "flex flex-col items-center gap-2",
//     actions: "flex items-center justify-center gap-5",
//     heading: "",
//     message: "text-[14px] text",
//     boxIcon:
//       "mb-2.5 flex h-[65px] w-[65px] items-center justify-center rounded-full",
//     icon: "flex h-[49px] w-[49px] items-center justify-center rounded-full border-[1.85px] border-solid bg-surface text-[30px]",
//   },
//   variants: {
//     intent: {
//       success: {
//         heading: "text-success",
//         boxIcon: "bg-surface-success",
//         icon: "border-success text-icon-success",
//       },
//       error: {
//         heading: "text-danger",
//         boxIcon: "bg-surface-danger",
//         icon: "border-danger text-icon-danger",
//       },
//       warning: {
//         heading: "text-warning",
//         boxIcon: "bg-surface-warning",
//         icon: "border-warning text-[49px] text-icon-warning",
//       },
//     },
//   },
//   defaultVariants: {
//     intent: "success",
//   },
// });

export function Alert(props: AlertProps) {
  const { title, text, open, setOpen } = props;

  return (
    <DialogPrimitives.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay />
        <DialogPrimitives.Content>
          <div className="fixed top-0 z-[1200] flex h-screen w-full items-center justify-center bg-[#00000050]">
            <div className="bg-white fixed left-[50%] top-[50%] flex w-full max-w-[488px] translate-x-[-50%] translate-y-[-50%] flex-col rounded px-6 pb-10 pt-8 text-center shadow-[rgba(0,_0,_0,_0.1)_0_4px_12px]">
              <div className="flex flex-col items-center gap-2">
                <div>
                  <MdError size={100} className="text-[#f87171]" />
                </div>
              </div>
              <DialogPrimitives.Title className="text-2xl text-[#4b5563] font-medium mt-5">
                {title}
              </DialogPrimitives.Title>
              <p className="text-[#4b5563] font-medium">{text}</p>
              <div>
                <button
                  onClick={() => setOpen(false)}
                  className="border border-[#d1d5db] rounded py-1.5 px-4 mt-6 text-sm font-medium hover:bg-[#f9fafb] transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </DialogPrimitives.Content>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}
