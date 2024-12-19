import * as ToastItem from "@radix-ui/react-toast";

type ToastProps = {
  content: string;
  open: boolean
};

export default function Toast(props: ToastProps) {
  const { content, open } = props;

  return (
    <div>
      <ToastItem.Root duration={3000} open={open}>
        <ToastItem.Title />
        <ToastItem.Description />
        <ToastItem.Action altText={content} />
        <ToastItem.Close />
      </ToastItem.Root>

      <ToastItem.Viewport />
    </div>
  );
}
