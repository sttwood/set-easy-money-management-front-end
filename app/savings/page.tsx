/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {useSidebarData} from '@/context/SidebarContext'
import {Spin} from 'antd'
import React, {useEffect} from 'react'

const SavingsPage = () => {
  const {collapsed, isRedirect, updateIsRedirect} = useSidebarData()

  useEffect(() => {
    updateIsRedirect(false)
  }, [])

  return (
    <>
      <main className={`bg-secondaryBG h-screen py-6 pr-6 transition-all ${collapsed ? 'pl-20' : 'pl-[299px]'}`}>
        SavingsPage
      </main>
      <Spin spinning={isRedirect} fullscreen />
    </>
  )
}

export default SavingsPage