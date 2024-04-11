"use client"
import React, {createContext, useContext, useState} from 'react';

type SidebarContextType = {
  collapsed: boolean;
  titlePage: string;
  updateSidebarData: (newData: boolean) => void;
  updateTitlePage: (newData: string) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({children}: {children: React.ReactNode}) {
  const [ collapsed, setCollapsed ] = useState(false);
  const [ titlePage, setTitlePage ] = useState('Dashboard');

  const updateSidebarData = (newData: boolean) => {
    setCollapsed(newData);
  };

  const updateTitlePage = (newData: string) => {
    setTitlePage(newData);
  }

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        titlePage,
        updateSidebarData,
        updateTitlePage
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarData() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarData must be used within an SidebarProvider');
  }
  return context;
}
