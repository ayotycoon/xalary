import React, { FC, useState, createContext } from 'react';

type StateContext = { 
  sidebarToggle: any; 
  toggleSidebar: () => void;

};


export const StateContext = createContext<StateContext>(
  {} as StateContext
);

export const StateProvider = ({ children }: any) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <StateContext.Provider value={{ sidebarToggle, toggleSidebar}}>
      {children}
    </StateContext.Provider>
  );
};
