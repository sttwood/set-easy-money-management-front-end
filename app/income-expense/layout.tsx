import Dashboardbar from '@/app/components/Dashboardbar'
import Siderbar from '../components/Sider'
import {Layout} from 'antd'
import React, {ReactNode} from 'react'

const IncomeExpenseLayout = ({children}: {children: ReactNode}) => {
  return (
    <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'row'}}>
      <Siderbar />
      <Layout className='w-full'>
        <Dashboardbar />
        {children}
      </Layout>
    </Layout>
  )
}

export default IncomeExpenseLayout