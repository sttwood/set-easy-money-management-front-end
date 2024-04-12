"use client"
import React, {createContext, useContext, useState} from 'react';

type SidebarContextType = {
  isRedirect: boolean;
  collapsed: boolean;
  titlePage: string;
  updateIsRedirect: (newData: boolean) => void;
  updateSidebarData: (newData: boolean) => void;
  updateTitlePage: (newData: string) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({children}: {children: React.ReactNode}) {
  const [ isRedirect, setIsRedirect ] = useState(false);
  const [ collapsed, setCollapsed ] = useState(false);
  const [ titlePage, setTitlePage ] = useState('Dashboard');

  const updateIsRedirect = (newData: boolean) => {
    setIsRedirect(newData);
  }

  const updateSidebarData = (newData: boolean) => {
    setCollapsed(newData);
  };

  const updateTitlePage = (newData: string) => {
    setTitlePage(newData);
  }


  return (
    <SidebarContext.Provider
      value={{
        isRedirect,
        collapsed,
        titlePage,
        updateIsRedirect,
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
