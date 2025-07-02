import { Tabs, type TabsProps } from 'antd'
import CardCarousel from './CardCarousel'
import CardActions from './CardActions'
import CardDetails from './CardDetails'
import TransactionList from './TransactionList'

const CardContent = () => (
  <div className="flex gap-[46px] rounded-lg p-10 border border-border shadow-[0px_2px_12px_rgba(0,0,0,0.08)]">
    <div>
      <CardCarousel />
      <CardActions />
    </div>
    <div className="w-full mt-[28px] md:mt-[29px]">
      <CardDetails />
      <TransactionList />
    </div>
  </div>
)

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'My debit cards',
    children: <CardContent />,
  },
  {
    key: '2',
    label: 'All company cards',
    children: <CardContent />,
  },
]

const CardDesktop = () => {
  return (
    <div className="mt-[34px]">
      <Tabs 
        items={items} 
        className="custom-tabs"
      />
    </div>
  )
}

export default CardDesktop
