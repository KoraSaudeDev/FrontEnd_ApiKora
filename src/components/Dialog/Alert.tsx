"use client";

import React from "react";
import * as DialogPrimitives from "@radix-ui/react-dialog";
import { MdError, MdCheckCircle } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";

export interface AlertProps {
  intent: "success" | "error" | "confirm";
  title: string;
  text: string;
  open: boolean;
  withClose?: boolean;
  setOpen: (open: boolean) => void;
  withConfirm?: boolean;
  confirm?: () => void;
}

export function Alert(props: AlertProps) {
  const {
    title,
    text,
    open,
    intent,
    setOpen,
    withClose,
    confirm,
    withConfirm = false,
  } = props;

  return (
    <DialogPrimitives.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay />
        <DialogPrimitives.Content>
          <div className="fixed top-0 z-[1200] flex h-screen w-full items-center justify-center bg-[#00000050]">
            <div className="bg-white fixed left-[50%] top-[50%] flex w-full max-w-[488px] translate-x-[-50%] translate-y-[-50%] flex-col rounded px-6 pb-10 pt-8 text-center shadow-[rgba(0,_0,_0,_0.1)_0_4px_12px]">
              <div className="flex flex-col items-center gap-2">
                {intent === "error" && (
                  <div>
                    <MdError size={100} className="text-[#f87171]" />
                  </div>
                )}

                {intent === "success" && (
                  <div>
                    <MdCheckCircle size={100} className="text-green-500" />
                  </div>
                )}

                {intent === "confirm" && (
                  <div>
                    <FaRegQuestionCircle size={100} className="text-yellow-500" />
                  </div>
                )}
              </div>
              <DialogPrimitives.Title className="text-2xl text-[#4b5563] font-medium mt-5">
                {title}
              </DialogPrimitives.Title>
              <p className="text-[#4b5563] font-medium">{text}</p>
              <div className="flex justify-center gap-3">
                {withConfirm && (
                  <div>
                    <button
                      onClick={confirm}
                      className="border border-[#28a745] bg-[#28a745] text-white rounded py-1.5 px-4 mt-6 text-sm font-medium hover:opacity-75 transition-all"
                    >
                      Confirmar
                    </button>
                  </div>
                )}
                {withClose && (
                  <div>
                    <button
                      onClick={() => setOpen(false)}
                      className="border border-[#d1d5db] rounded py-1.5 px-4 mt-6 text-sm font-medium hover:bg-[#f9fafb] transition-all"
                    >
                      Fechar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPrimitives.Content>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
}
