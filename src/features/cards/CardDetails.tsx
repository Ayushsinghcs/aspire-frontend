import { Flex, type CollapseProps } from 'antd'
import { useAppSelector } from '../../core/store/hooks'
import CollapsibleSection from '../../shared/components/CollapsibleSection'
import DetailsIcon from '../../assets/icons/card-details.svg?react'

const CardDetails = () => {
  const { selectedCard, cardDetailsVisibility } = useAppSelector((state) => state.card)
  const isCardDetailsVisible = selectedCard ? (cardDetailsVisibility[selectedCard.id] || false) : false

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <Flex gap={12} align="center">
          <DetailsIcon />
          <p className="text-background text-sm">Card details</p>
        </Flex>
      ),
      children: selectedCard ? (
        isCardDetailsVisible ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Card Holder Name</p>
                <p className="text-sm font-semibold">{selectedCard.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Card Number</p>
                <p className="text-sm font-semibold">{selectedCard.number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Expiry Date</p>
                <p className="text-sm font-semibold">{selectedCard.expiry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">CVV</p>
                <p className="text-sm font-semibold">{selectedCard.cvv}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Balance</p>
                <p className="text-sm font-semibold">S$ {selectedCard.balance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  selectedCard.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedCard.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">Card details are hidden</p>
            <p className="text-sm text-gray-400">Click "Show card number" to view card details</p>
          </div>
        )
      ) : (
        <p className="text-gray-500">No card selected</p>
      ),
    },
  ]

  return <CollapsibleSection items={items} />
}

export default CardDetails
