import { Grid, Layout } from 'antd'
import './App.css'
import '@ant-design/v5-patch-for-react-19'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer } from 'antd/es/layout/layout'
import Navigation from './shared/components/Navigation'
import AspireLogo from './assets/icons/aspire-logo.svg?react'
import Balance from './features/balance/Balance'
import CardDesktop from './features/cards/CardDesktop'
import CardMobile from './features/cards/CardMobile'
import CardActions from './features/cards/CardActions'
import CardDetails from './features/cards/CardDetails'
import TransactionList from './features/cards/TransactionList'

const { useBreakpoint } = Grid

function App() {
  const screens = useBreakpoint()
  const isMobile = !screens.md

  return (
    <Layout className="app-layout relative">
      {!isMobile && (
        <Sider className="sider">
          <div>
            <AspireLogo className="text-primary" />
            <p className="text-md text-white opacity-30 mt-[19px]">
              Trusted way of banking for 3,000+ SMEs and startups in Singapore
            </p>
          </div>
          <Navigation
            mode="inline"
            menuClassName="bg-transparent mt-[81px]"
            itemClassName="!p-0 m-0 text-base h-[80px] focus:font-bold"
          />
        </Sider>
      )}
      <Content className="content scrollbar-hide md:h-screen px-6 py-8 md:p-[60px] bg-background md:bg-white">
        <Balance />
        {!isMobile ? <CardDesktop /> : <CardMobile />}
      </Content>
      {isMobile && (
        <Content className="overflow-auto w-full h-[calc(100%_-_56px)] absolute pointer-events-none z-50">
          <div className="mt-[495px] pointer-events-auto bg-white pb-16 rounded-t-3xl">
            <CardActions className="rounded-t-3xl rounded-b-none" />
            <div className="px-6 pt-6">
              <CardDetails />
              <TransactionList />
            </div>
          </div>
        </Content>
      )}
      {isMobile && (
        <Footer className="p-0 shadow-[0px_-3px_6px_rgba(0,0,0,0.078)] z-[9999]">
          <Navigation
            mode="horizontal"
            menuClassName="leading-[23.2px] justify-around"
            itemClassName="text-[9px] flex flex-col items-center pt-[9px]"
          />
        </Footer>
      )}
    </Layout>
  )
}

export default App
