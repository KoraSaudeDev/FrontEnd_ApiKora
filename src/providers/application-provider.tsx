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



type Routes = {
  prefixes: string[],
  slugs: any[]
}

type User = {
  id: number;
  is_admin: boolean;
  username: string;
  routes: Routes;
  is_active: boolean;
  accesses: any[]
};

type ApplicationContext = {
  usuario: User | null;
  init(data: User): void;
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
  data: User | null;
  children: ReactNode;
}) => {
  const { data, children } = props;

  // States ---
  const [usuario, setUsuario] = useState<User | null>(null);

  // Effects ---
  useEffect(() => {
    if (!data) return;
    init(data);
  }, [data]);

  // Functions ---
  function init(data: User) {
    return data && setUsuario(data);
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
