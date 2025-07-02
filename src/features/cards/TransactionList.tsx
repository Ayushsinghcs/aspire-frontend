import { Divider, Flex, type CollapseProps } from 'antd'
import CollapsibleSection from '../../shared/components/CollapsibleSection'
import TransactionsIcon from '../../assets/icons/transactions-icon.svg?react'
import BoxIcon from '../../assets/icons/storage-icon.svg?react'
import FlightsIcon from '../../assets/icons/flights-icon.svg?react'
import MegaphoneIcon from '../../assets/icons/megaphone-icon.svg?react'
import MiniCardIcon from '../../assets/icons/card-mini.svg?react'
import NextIcon from '../../assets/icons/arrow-next.svg?react'
import { useAppSelector } from '../../core/store/hooks'
import { useMemo } from 'react'
import { formatCurrency } from '../../shared/utils'
import dayjs from 'dayjs'
import type { Transaction } from '../../shared/types'

const TYPE_MAPPING: Record<string, { className: string; icon: React.ReactNode }> = {
  box: { className: 'bg-[#009DFF1A]', icon: <BoxIcon /> },
  flights: { className: 'bg-[#00D6B51A]', icon: <FlightsIcon /> },
  megaphone: { className: 'bg-[#F251951A]', icon: <MegaphoneIcon /> },
}

const TransactionList = () => {
  const { selectedCard } = useAppSelector((state) => state.card)
  const transactions = useMemo(() => selectedCard?.transactions ?? [], [selectedCard])

  const renderTransaction = (item: Transaction, index: number) => {
    const { className, icon } = TYPE_MAPPING[item.icon] || {}

    return (
      <div key={item.id}>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className={`w-12 h-12 ${className} rounded-full flex items-center justify-center`}>
              {icon}
            </div>
            <div>
              <p className="text-sm font-semibold">{item.merchant}</p>
              <p className="text-[13px] text-[#AAAAAA] mt-1">
                {dayjs(item.date).format('DD MMM YYYY')}
              </p>
              <div className="text-xs flex items-center gap-2 mt-[14px]">
                <div className="w-6 h-5 rounded-full bg-secondary flex items-center justify-center">
                  <MiniCardIcon />
                </div>
                <p className="text-xs text-secondary font-semibold">{item.description}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-[10.5px] items-center">
              <p
                className={`text-sm font-bold ${
                  item.type === 'charge' ? 'text-black' : 'text-primary'
                }`}
              >
                {item.type === 'charge' ? '- S$ ' : '+ S$ '}
                {formatCurrency(item.amount)}
              </p>
              <NextIcon />
            </div>
          </div>
        </div>
        {index < transactions.length - 1 && <Divider className="my-4" />}
      </div>
    )
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <Flex gap={12} align="center">
          <TransactionsIcon />
          <p className="text-background text-sm">Recent transactions</p>
        </Flex>
      ),
      children: (
        <div>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => renderTransaction(transaction, index))
          ) : (
            <p className="text-center text-gray-500 py-4">No transactions found</p>
          )}
        </div>
      ),
    },
  ]

  return <CollapsibleSection items={items} />
}

export default TransactionList
