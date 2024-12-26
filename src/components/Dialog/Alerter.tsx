"use client";

import { useAlert } from "@/hooks/use-alert";
import { Alert } from "./Alert";


export function Alerter() {
  const data = useAlert();

  const props = {
    intent: data.intent,
    title: data.title,
    text: data.text,
    label: data.label,
    withClose: data.withClose,
    withConfirm: data.withConfirm,
    confirm: data.confirm
  };

  return <Alert open={data.open} setOpen={data.setOpen} {...props} />;
}
