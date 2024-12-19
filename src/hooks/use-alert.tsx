import { useEffect, useState } from "react";

type State = {
  open: boolean;
  title: string;
  text: string;
  label: string;
  withClose?: boolean;
};

type Setter = React.Dispatch<React.SetStateAction<State>> | null;
let setterAlert: Setter = null;

let memoryStateAlert: State = {
  open: false,
  title: "",
  text: "",
  label: "Fechar",
  withClose: true,
};

function alert(options: Partial<State>) {
  memoryStateAlert = {
    ...memoryStateAlert,
    ...options,
    open: true,
  };

  if (setterAlert) {
    setterAlert(memoryStateAlert);
  }
}

function useAlert() {
  const [alertState, setAlertState] = useState<State>(memoryStateAlert);

  useEffect(() => {
    setterAlert = setAlertState;

    return () => {
      if (setterAlert === setAlertState) {
        setterAlert = null;
      }
    };
  }, []);

  return {
    ...alertState,
    setOpen(open: boolean) {
      return setterAlert?.((prevAlertState) => ({
        ...prevAlertState,
        open,
      }));
    },
  };
}

export { useAlert, alert };
