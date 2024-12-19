"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

/*
 |-----------------------------------------------------------------------------
 | Types
 |-----------------------------------------------------------------------------
*/


type ApplicationContext = {
  usuario: string[] | null;
  init(data: string[] ): void;
};

/*
 |-----------------------------------------------------------------------------
 | Context
 |-----------------------------------------------------------------------------
*/
const ApplicationContext = createContext<ApplicationContext | undefined>(
  undefined
);

/*
 |-----------------------------------------------------------------------------
 | Provider
 |-----------------------------------------------------------------------------
*/
export const ApplicationProvider = (props: {
  data: string[];
  children: ReactNode;
}) => {
  const { data, children } = props;

  // States ---
  const [usuario, setUsuario] = useState<string[] | null>(null);

  // Effects ---
  useEffect(() => {
    if (!data) return;
    init(data);
  }, [data]);

  // Functions ---
  function init(data: string[]) {
   return  data && setUsuario(data);
  }

  // Context ---
  const context = {
    usuario,

    init,
  };

  return (
    <ApplicationContext.Provider value={context}>
      {children}
    </ApplicationContext.Provider>
  );
};

/*
 |-----------------------------------------------------------------------------
 | Hook
 |-----------------------------------------------------------------------------
*/
export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplication must be used within a ApplicationProvider");
  }
  return context;
};
