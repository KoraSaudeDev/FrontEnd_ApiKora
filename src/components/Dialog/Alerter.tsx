"use client";

import { useAlert } from "@/hooks/use-alert";
import { Alert } from "./Alert";


export function Alerter() {
  const data = useAlert();

  const props = {
    title: data.title,
    text: data.text,
    label: data.label,
    withClose: data.withClose,
  };

  return <Alert open={data.open} setOpen={data.setOpen} {...props} />;
}
