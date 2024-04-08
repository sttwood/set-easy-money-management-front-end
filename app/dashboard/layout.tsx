import Dashboardbar from '@/app/components/Dashboardbar'
import Siderbar from '../components/Sider'
import {Layout} from 'antd'
import React, {ReactNode} from 'react'

const DashboardLayout = ({children}: {children: ReactNode}) => {
  return (
    <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'row'}}>
      <Siderbar />
      <Layout>
        <Dashboardbar />
        {children}
      </Layout>
    </Layout>
  )
}

export default DashboardLayout